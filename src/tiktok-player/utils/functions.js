


export const getBoxValue = object => Object.values(object).join(" ");

export const generateString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
}

export const tabController = () => {
    setTimeout(() => {
        const panelBodies = document.querySelectorAll('.components-panel__body-title button');
        panelBodies.forEach(item => {
            item.addEventListener('click', clickEveryItem);
        });

        function clickEveryItem() {
            this.removeEventListener('click', clickEveryItem);
            panelBodies.forEach(item => {
                if (item.getAttribute('aria-expanded') === 'true' && !item.isEqualNode(this)) {
                    item.click();
                }
            });
            setTimeout(() => {
                this.addEventListener('click', clickEveryItem);
            }, 500);
        }
    }, 500);
};

export const checkLayout = (val) => {
    if (val === '') {
        return {
            overlyIcon: { size: 14 }
        };
    }
}

export const dateTimeConvert = (val) => {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const createTime = dateFormatter.format(val * 1000);

    return createTime;
}

export const ratioCheck = (val = "9:16") => {
    const [width, height] = val.split(':');
    const result = (parseInt(height) / parseInt(width)) * 100;
    return result;
}