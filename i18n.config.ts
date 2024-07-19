import en from '~/lang/en-US';
import ru from '~/lang/ru-RU';
// import kz from '~/locales/kz/kz.json';

export default defineI18nConfig(() => ({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    allowComposition: true,
    pluralizationRules: {
        ru(choice, choicesLength) {
            if (choice === 0)
                return 0;

            if (choicesLength === 2 && choice > 1)
                return 1;

            if (choicesLength > 2) {
                if (choice < 5 && choice > 1)
                    return choicesLength - 2;
                else if (choice >= 5)
                    return choicesLength - 1;
                else if (choice === 1)
                    return choicesLength - 3;
            }
            return 0;
        },
    },

    messages: {
        en,
        ru,
    },
}));