import React, {useState} from 'react';

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    async function fetching() {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
};