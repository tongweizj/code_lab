async function test() {

  const end = new Date().valueOf();
  const start = end - 1000 * 60 * 60 * 24 * 11

  const pondIDs = [
    'water_8ed0b65fba50c60a24dd3718cd29d073',
    'water_6ee5d2fc8b8a422ecf513c6fc840436f',
    'water_1b6a46c1e2ab971f4bdab1486eadc812',
    'water_bb0972594ad1dc4c8acb63036303b533',
    'water_561db973c9c5b70dedc93ee077ec4c8e',
    'water_db8ae5a4d6bc0cd7ce7473dc466ef83c',
    'water_f0e84f207be9cb14cfa35fad37c5d08f',
    'water_c8ca123d03de10d8b05b17b053ececf0',
    'water_fe04bbe85493e5bf64810f355d193884',
    'water_911ca6e2c48ddb4e74b0c1c3f775177f'
  ]

  for (const id of pondIDs) {
    console.log(id)
    const query = 'SELECT * FROM public.water_msg WHERE update_time BETWEEN $1 AND $2 AND device_id=$3';
    const params = [start, end, id];
    let res = await sendQuery(query, params);
    res = res.sort((a, b) => parseInt(a.update_time) - parseInt(b.update_time));
    console.log('res: ', res.length);
    let prev = 0


    for (const i of res) {
      if (Math.abs(prev - parseInt(i.update_time)) > 1000 * 60 * 60) {
        console.log(prev, i.update_time)
        console.log(moment(prev).tz('America/Toronto').format('YYYY/MM/DD, HH:mm'));
        console.log(moment(parseInt(i.update_time)).tz('America/Toronto').format('YYYY/MM/DD, HH:mm'));
      }
      prev = parseInt(i.update_time)
    }
    console.log('**********************************')

  }

}