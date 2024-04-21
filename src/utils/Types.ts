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
    deals_date: string,
    discount: number,
    short_details: string
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
    image?: string
}

export type AddDeals = {
    pname: AddDealsElement,
    price: AddDealsElement,
    coupon: AddDealsElement,
    producturl: AddDealsElement,
    productdetails: AddDealsElement,
    pimage: AddDealsElement,
    dealtype: AddDealsElement,
    discount: AddDealsElement,
    pshortdetails: AddDealsElement
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

export type ProductListProps = {
    pid: string,
    pname: string,
    pimageurl?: string,
    dealtype?: string,
    tag?: string,
    price: string,
    discount?: string,
    coupon?: string,
    pshortdetails: string,
    productdetails: string,
    ptimestamp?: string,
    producturl: string
}