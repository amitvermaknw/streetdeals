import { createContext, ReactNode, useEffect, useState } from 'react';
import { createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';


interface DbContextType {
    db: RxDatabase | null;
}
export const DbContext = createContext<DbContextType | undefined>(undefined);

const DbProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<RxDatabase | null>(null);

    useEffect(() => {
        const initDb = async () => {
            const dbStore = await createRxDatabase({
                name: 'dealsburststore',
                storage: getRxStorageDexie(),
                ignoreDuplicate: true
            });
            setDb(dbStore);
        };

        initDb();
    }, []);

    return (
        <DbContext.Provider value={{ db }}>
            {children}
        </DbContext.Provider>
    );
};

export default DbProvider;