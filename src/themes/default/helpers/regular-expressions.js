/* eslint-disable */

export function isPhone (value) {
  if (value) {
    return /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value)
  }
  return true
}

export function lettersOnly (value) {
  if (value) {
    return /^[А-Яа-яЁёЇїІіЄєҐґ]?[А-Яа-яЁёЇїІіЄєҐґ\'\-]+[А-Яа-яЁёЇїІіЄєҐґ]+$/.test(value)
  }
  return true
};
