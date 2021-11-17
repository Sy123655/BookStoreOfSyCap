import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LoadingBox() {
    const { t } = useTranslation();
    return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin">{t("Loading")}...</i>
        </div>

    )
}