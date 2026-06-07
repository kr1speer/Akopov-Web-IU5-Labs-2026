class Ajax {

    async get(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Ошибка GET запроса:', error);
            return null;
        }
    }


    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка POST запроса:', error);
            return null;
        }
    }


    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка PATCH запроса:', error);
            return null;
        }
    }


    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (response.ok) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Ошибка DELETE запроса:', error);
            return false;
        }
    }
}

export const ajax = new Ajax();
