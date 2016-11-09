const info = 'En fait c&quote;est très simple, et malgré le fait qu&quote;il se camoufle aisément dans votre sapin, vous pouvez remarquer sa présence assez rapidement. Il commencera subtilement en déplaçant des objets, en les cachant à des endroits inusités. Plus les nuits passent, plus il prendra confiance. Par exemple, il mangera vos collations, fera peur au chat, renversera des boites de céréales, etc. ! À ce point, il sera temps d&quote;agir !'
export const getInfos = (req, res) => {
  res.send({info: info})
}
