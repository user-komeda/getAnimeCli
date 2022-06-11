/**
 *
 * @param {number} sec sec
 * @return {Promise<void>} setTimeout
 */
export const sleep = (sec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, sec)
  })
