import React from 'react'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import ButtonChangeLanguage from '../../common/ButtonChangeLanguage/ButtonChangeLanguage';
// change language click hook
const languages = [
    {
        code: 'en',
        name: 'English',
        country_code: 'en'
    },
    {
        code: 'vn',
        name: 'Vietnamese',
        country_code: 'vn'
    },
    {
        code: 'sp',
        name: 'Spanish',
        country_code: 'sp'
    },
]
export const ButtonChange = () => {
    const { t } = useTranslation()
    const currentLanguageCode = cookies.get('i18next') || 'en'
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
    React.useEffect(() => {
        // console.log('Setting page stuff')
        document.body.dir = currentLanguage.dir || 'ltr'
        // document.title = t('app_title')
    }, [currentLanguage, t])

    return (
        <React.Fragment>
            <ButtonChangeLanguage dataLanguages={languages} />
        </React.Fragment>
    );
}
