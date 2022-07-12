import React from "react";

interface BusinessCard {
	currentCardIdx: number;
	setCard: (idx: number) => Promise<void>;
}

const BusinessCardContext = React.createContext<BusinessCard>({
	currentCardIdx: 0,
	setCard: async () => {},
});

export const BusinessCardProvider = BusinessCardContext.Provider;
export const BusinessCardConsumer = BusinessCardContext.Consumer;

export default BusinessCardContext;
