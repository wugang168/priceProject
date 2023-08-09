
import dayjs from "dayjs"
export function formatYYYYMMDD(ns) {
  return dayjs(ns).format('YYYY-MM-DD')
}