export const formatePrice = (cents) => {
    return (cents / 100).toLocaleString('zh', {
      style: 'currency',
      currency: 'CNY'
    })
  }