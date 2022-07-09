import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: "deposit" | "withdraw";
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionProviderProps {
  children: ReactNode;
}

interface ITransactionContext {
  transactions: ITransaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<ITransactionContext>(
  {} as ITransactionContext
);

export function TransactionProvider({ children }: ITransactionProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then(({ data: { transactions } }) => setTransactions(transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const {
      data: { transaction },
    } = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);

  return context;
}
