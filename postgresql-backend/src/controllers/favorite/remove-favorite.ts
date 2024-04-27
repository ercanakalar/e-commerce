import { Request, Response } from 'express';

import { IFavorite, IFavoriteDatabase } from '../../types/favorite/favorite.interface';
import { Database } from '../../config/db';
import { BadRequestError } from '../../errors';
import { QueryResult } from 'pg';

export const removeFavorite = async (args: IFavorite, req: Request, res: Response) => {
    const { productId } = args;
    const authId = req.currentAuth!.id;
    let saveProductsArray: any = []
    
    let queryText = `SELECT * FROM favorite WHERE auth_id = $1`;
    let values = [authId];
    const favorites = await new Database().query(queryText, values);
        
    if(favorites?.rowCount === 0 || !favorites?.rows[0]?.products.includes(productId)) {
        throw new BadRequestError('Favorites, or favorite id not found')
    } else {
        queryText = `UPDATE favorite SET products = $2 WHERE auth_id = $1 RETURNING *`;
        const newArray = favorites?.rows[0].products.filter((product: any) => product !== productId)
        saveProductsArray = [...new Set(newArray)]
    }
    
    values = [authId, saveProductsArray];
    const favorite = await new Database().query(queryText, values);

    if(!favorite) {
        throw new BadRequestError('Favorite not removed')
    }

    const favoriteRow = favorite.rows[0];

    return {
        message: 'Favorite removed',
        data: {
            authId,
            products: favoriteRow.products ?? []
        }
    }
};

