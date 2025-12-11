import { Money } from '../domain/Money';

type BalanceQuery = (ledgerName?: string) => Promise<{
  [c in Money.AllowedCurrencies]: number;
}>;

export { BalanceQuery };
