/* eslint-disable */

export function isPhone (value) {
  return /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value)
}

export function lettersOnly (value) {
  /^[А-Яа-яЁёЇїІіЄєҐґ]?[А-Яа-яЁёЇїІіЄєҐґ\'\-]+[А-Яа-яЁёЇїІіЄєҐґ]+$/.test(value)
};
