interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

class Datasource {
    private url: string;
    constructor(url: string) {
        this.url = url;
    }

    async getPrices(): Promise<{ [currency: string]: number }> {
        try {
            const res = await fetch(this.url);
            const prices = await res.json();
            return prices;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

interface Props extends BoxProps {

}
// Extending Props from BoxProps is not necessary when Props is not overriding
// any methods or adding any data or methods in the subclass.

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const datasource = new Datasource("https://interview.switcheo.com/prices.json");
        datasource.getPrices().then(prices => {
            setPrices(prices);
        }).catch(error => {
            console.err(error);
            // console.err is an incorrect method. It should be console.error(error).
        });
    }, []);

    const getPriority = (blockchain: any): number => {
        // Declaring an 'any' data type here does not ensure type safety. It should be
        // modified to (blockchain: string).
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {
                // lhsPriority is not declared. It should be (balancePriority > -99)
                if (balance.amount <= 0) {
                    return true;
                }
            }
            return false
            // missing ; after false here. It should be return false;
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
            // The if else block does not handle the case where leftPriority === rightPriority.
            // an else block can be used to handle this.
        });
    }, [balances, prices]);

    // The block is trying to access the blockchain field which is not declared in the
    // WalletBalance interface. WalletBalance should include this field as such:
    // interface WalletBalance {
    //     currency: string;
    //     amount: number;
    //     blockchain: string;
    // }

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })

    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}



// --------------------------- REFACTORED CODE --------------------------- //

interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance extends WalletBalance { // Refactored
    formatted: string;
}

class Datasource {

}

interface WalletPageProps extends BoxProps { // Refactored

}

const WalletPage: React.FC<Props> = (props: WalletPageProps) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});
    const PRICES_URL: string = "https://interview.switcheo.com/prices.json"; // Refactored

    useEffect(() => {
        const datasource = new Datasource(PRICES_URL);
        datasource.getPrices().then(prices => {
            setPrices(prices);
        }).catch(error => {
            console.err(error);
        });
    }, []);

    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            return (balancePriority > 99 && balance.amount <= 0); // Refactored
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
        });
    }, [balances, prices]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({ // Refactored
        ...balance,
        formatted: balance.amount.toFixed()
    }));


    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}