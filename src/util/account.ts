import { AccountType } from '../models/account.model';

export function getAccounts(): AccountType[] {
  const accounts = localStorage.getItem('accounts')!;
  return accounts ? JSON.parse(accounts) : [];
}
