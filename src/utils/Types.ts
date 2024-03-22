import React from 'react';

export type LayoutProps = {
    children: React.ReactNode
}

export type DealsProps = {
    id: string
    title: string
    image: string
    type: string
    tag: string
    price: string
    promo_code: string
    product_details: string
    deals_date: string
}

export type AddDeals = {
    name: string,
    id: string,
    placeholder: string,
    type: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => string,
    validation: Array<{ required: boolean; msg: string; }>
}