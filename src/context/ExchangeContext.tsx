import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";

// Types
export interface Participant {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
  exclusions: string[];
}

export interface GiftExchange {
  id: string;
  name: string;
  budget: number;
  currency: string;
  date: string;
  participants: Participant[];
  assignments: Record<string, string>;
  isDrawn: boolean;
  createdAt: string;
}

// Helper functions
const createExchange = (name: string, budget: number, date: string): GiftExchange => ({
  id: uuidv4(),
  name,
  budget,
  currency: "USD",
  date,
  participants: [],
  assignments: {},
  isDrawn: false,
  createdAt: new Date().toISOString(),
});

const createParticipant = (name: string, email: string): Participant => ({
  id: uuidv4(),
  name,
  email,
  wishlist: [],
  exclusions: [],
});

const drawNames = (participants: Participant[]): Record<string, string> | null => {
  if (participants.length < 2) return null;

  const maxAttempts = 1000;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const receivers = [...participants];
    const assignments: Record<string, string> = {};
    let valid = true;

    for (const giver of participants) {
      const validReceivers = receivers.filter(
        (r) => r.id !== giver.id && !giver.exclusions.includes(r.id)
      );

      if (validReceivers.length === 0) {
        valid = false;
        break;
      }

      const receiver = validReceivers[Math.floor(Math.random() * validReceivers.length)];
      assignments[giver.id] = receiver.id;

      const idx = receivers.findIndex((r) => r.id === receiver.id);
      receivers.splice(idx, 1);
    }

    if (valid && Object.keys(assignments).length === participants.length) {
      return assignments;
    }

    attempts++;
  }

  return null;
};

interface ExchangeContextType {
  exchanges: GiftExchange[];
  currentExchange: GiftExchange | null;
  createNewExchange: (
    name: string,
    budget: number,
    date: string
  ) => GiftExchange;
  setCurrentExchange: (exchange: GiftExchange | null) => void;
  getExchangeById: (id: string) => GiftExchange | undefined;
  addParticipant: (exchangeId: string, name: string, email: string) => void;
  removeParticipant: (exchangeId: string, participantId: string) => void;
  updateParticipantWishlist: (
    exchangeId: string,
    participantId: string,
    wishlist: string[]
  ) => void;
  performDraw: (exchangeId: string) => boolean;
  resetDraw: (exchangeId: string) => void;
}

const ExchangeContext = createContext<ExchangeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "secret-santa-exchanges";

export const ExchangeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [exchanges, setExchanges] = useState<GiftExchange[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentExchange, setCurrentExchange] = useState<GiftExchange | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exchanges));
  }, [exchanges]);

  const createNewExchange = (
    name: string,
    budget: number,
    date: string
  ): GiftExchange => {
    const exchange = createExchange(name, budget, date);
    setExchanges((prev) => [...prev, exchange]);
    setCurrentExchange(exchange);
    return exchange;
  };

  const getExchangeById = (id: string) => exchanges.find((e) => e.id === id);

  const updateExchange = (
    id: string,
    updater: (e: GiftExchange) => GiftExchange
  ) => {
    setExchanges((prev) => prev.map((e) => (e.id === id ? updater(e) : e)));
    if (currentExchange?.id === id) {
      setCurrentExchange((prev) => (prev ? updater(prev) : null));
    }
  };

  const addParticipant = (exchangeId: string, name: string, email: string) => {
    const participant = createParticipant(name, email);
    updateExchange(exchangeId, (e) => ({
      ...e,
      participants: [...e.participants, participant],
    }));
  };

  const removeParticipant = (exchangeId: string, participantId: string) => {
    updateExchange(exchangeId, (e) => ({
      ...e,
      participants: e.participants.filter((p) => p.id !== participantId),
    }));
  };

  const updateParticipantWishlist = (
    exchangeId: string,
    participantId: string,
    wishlist: string[]
  ) => {
    updateExchange(exchangeId, (e) => ({
      ...e,
      participants: e.participants.map((p) =>
        p.id === participantId ? { ...p, wishlist } : p
      ),
    }));
  };

  const performDraw = (exchangeId: string): boolean => {
    const exchange = getExchangeById(exchangeId);
    if (!exchange) return false;

    const assignments = drawNames(exchange.participants);
    if (!assignments) return false;

    updateExchange(exchangeId, (e) => ({
      ...e,
      assignments,
      isDrawn: true,
    }));
    return true;
  };

  const resetDraw = (exchangeId: string) => {
    updateExchange(exchangeId, (e) => ({
      ...e,
      assignments: {},
      isDrawn: false,
    }));
  };

  return (
    <ExchangeContext.Provider
      value={{
        exchanges,
        currentExchange,
        createNewExchange,
        setCurrentExchange,
        getExchangeById,
        addParticipant,
        removeParticipant,
        updateParticipantWishlist,
        performDraw,
        resetDraw,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error("useExchange must be used within ExchangeProvider");
  }
  return context;
};
