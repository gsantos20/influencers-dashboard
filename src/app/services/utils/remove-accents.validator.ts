/**
 * Ignore accents when input validation is needed.
 */

export function removeAccents(text: string): string {
  text = text?.toLowerCase();
  text = text?.replace(new RegExp(/[\xE0-\xE6]/g), 'a');
  text = text?.replace(new RegExp(/[\xE8-\xEB]/g), 'e');
  text = text?.replace(new RegExp(/[\xEC-\xEF]/g), 'i');
  text = text?.replace(new RegExp(/[\xF2-\xF6]/g), 'o');
  text = text?.replace(new RegExp(/[\xF9-\xFC]/g), 'u');
  text = text?.replace(new RegExp(/\xE7/g), 'c');
  text = text?.replace(new RegExp(/\xF1/g), 'n');
  return text;
}
