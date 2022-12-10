export const STUDENT_PERM = 0
export const TEACHER_PERM = 1
export const PDR_TEACHER_PERM = 2
export const AS_PRINCIPAL_PERM = 3
export const PRINCIPAL_PERM = 4
export const API_URL = "http://192.168.0.23:5000"

export const PDR_TIMES = {
  "10:00": 1,
  "10:20": 2,
  "10:40": 3,
  "11:00": 4,
  "11:20": 5,
  "11:40": 6,
  "12:00": 7,
}
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
