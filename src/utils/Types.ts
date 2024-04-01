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

export type AddDealsElement = {
    name: string,
    id: string,
    placeholder: string,
    type: string,
    label: string,
    value: string,
    validation: Array<{ required: boolean; alert: string; }>,
    imageObject?: string
}

export type AddDeals = {
    pname: AddDealsElement,
    price: AddDealsElement,
    coupon: AddDealsElement,
    producturl: AddDealsElement,
    productdetails: AddDealsElement,
    pimage: AddDealsElement,
    dealtype: AddDealsElement
};

export type EventType = { event?: React.ChangeEvent<HTMLInputElement> }
export type VoidFun = () => void;


export type BannerListProps = {
    id: string
    image: string
    url: string
}

export type AddBanner = {
    bname: AddDealsElement,
    broducturl: AddDealsElement,
    bimage: AddDealsElement
};