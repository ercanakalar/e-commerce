// noinspection NonAsciiCharacters

type ILetter = {
  [key: string]: string;
};
// type IArgument = {
//   [key: number]: string;
// };
class StringUtils {
  static letters: ILetter = {
    i: 'İ',
    ş: 'Ş',
    ğ: 'Ğ',
    ü: 'Ü',
    ö: 'Ö',
    ç: 'Ç',
    ı: 'I',
  };
  static toUpperTurkish = (str: string) => {
    str = str.replace(/(([iışğüçö]))+/g, (letter) => this.letters[letter]);
    return str.toUpperCase();
  };

  static replacePlaceholders = (str: string, args: any) => {
    return str.replace(
      /{(\w+)}/g,
      (match: string, index: string) => args[index] || match
    );
  };

  static formatWithArguments = (s: string | any, args: any[]) => {
    if (!/{(\d+)}/g.test(s)) {
      return s;
    }
    return s.replace(/{(\d+)}/g, (match: any, number: number) => {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };

  static splitFullName = (fullName: string) => {
    const names = fullName.split(' ');
    const lastName = names.pop()?.trim();
    const firstName = names.join(' ').trim();
    return { firstName, lastName };
  };

  static formatInternationalPhone = (phone: string) => {
    if (phone?.length !== 13) {
      return phone;
    }

    return phone.replace(
      /(\+)([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})/,
      '$1$2 $3 $4 $5 $6'
    );
  };

  static toTitleCase = (string: string) => {
    return string
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
}

export default StringUtils;
