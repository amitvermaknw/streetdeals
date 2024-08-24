import { createContext, ReactNode, useEffect, useState } from 'react';
import { createRxDatabase, RxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
// import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

addRxPlugin(RxDBQueryBuilderPlugin);

interface DbContextType {
    db: RxDatabase | null;
}
export const DbContext = createContext<DbContextType | undefined>(undefined);

const DbProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<RxDatabase | null>(null);

    useEffect(() => {
        const initDb = async () => {
            const dbStore = await createRxDatabase({
                name: 'dealsburstlocaldb',
                storage: getRxStorageDexie(),
                // storage: getRxStorageMemory(),
                ignoreDuplicate: false
            });
            setDb(dbStore);
        };
        if (Object.keys(db?.collections ? db?.collections : {}).length === 0) {
            initDb();
        }
    }, []);

    return (
        <DbContext.Provider value={{ db }}>
            {children}
        </DbContext.Provider>
    );
};

export default DbProvider;