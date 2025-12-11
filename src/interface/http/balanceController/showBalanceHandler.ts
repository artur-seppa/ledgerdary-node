import { z } from 'zod';
import { handler } from '../../../_lib/http';
import { makeValidator } from '../../../_lib/http/RequestValidation';

const { getParams } = makeValidator({
  params: z.object({
    ledger: z.string().optional(),
  }),
});

const showBalanceHandler = handler(({ balanceQuery }) => async (req, res) => {
  const { ledger } = getParams(req);

  const balance = await balanceQuery(ledger);

  res.status(200).json(balance);
});

export { showBalanceHandler };
