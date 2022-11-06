import type { NextApiRequest, NextApiResponse } from 'next'

import data from '../../../content/data.json'
import { Data } from '../../../types/DataType'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data)
}
