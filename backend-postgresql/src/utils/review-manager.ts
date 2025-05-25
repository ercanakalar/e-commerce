import { Database } from '../config/db';
import { IReviewDatabase } from '../types/review/review.interface';

export class ReviewManager {
  getReviewRate(reviewsRow: IReviewDatabase[]) {
    const averageRate =
      reviewsRow.reduce(
        (sum: number, review: IReviewDatabase) => sum + review.rate,
        0
      ) / reviewsRow.length;
    return averageRate.toFixed(2);
  }
  
  async updateProductRating(productId: number) {
    let queryText = `SELECT * FROM reviews WHERE product_id = $1`;
    const reviews = await new Database().query(queryText, [productId]);

    const averageRate = this.getReviewRate(reviews!.rows);
    queryText = `UPDATE product SET rating = $1 WHERE id = $2`;
    await new Database().query(queryText, [averageRate, productId]);
  }
}
