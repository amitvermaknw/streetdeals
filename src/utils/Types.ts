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

export type FormElements = {
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
    pid?: FormElements,
    pname: FormElements,
    price: FormElements,
    coupon: FormElements,
    producturl: FormElements,
    productdetails: FormElements,
    pimage: FormElements,
    dealtype: FormElements,
    discount: FormElements,
    pshortdetails: FormElements,
    preprice: FormElements,
    dealstatus?: FormElements,
    pcategory: FormElements,
    preview: FormElements,
    ptimeframe: FormElements,
};

export type EventType = { event?: React.ChangeEvent<HTMLInputElement> }
export type VoidFun = () => void;

export type AddBanner = {
    bname: FormElements,
    bannerurl: FormElements,
    bimage: FormElements,
    bstatus: FormElements
};

export type ProductListProps = {
    [x: string]: unknown;
    pid: string,
    pname: string,
    pimageurl: string,
    dealtype?: string,
    tag?: string,
    price: string,
    discount?: string,
    coupon?: string,
    pshortdetails: string,
    productdetails: string,
    ptimestamp?: string,
    producturl: string,
    documentId?: string,
    dealstatus?: string
    preprice: string,
    pcategory: string,
    preview: string,
    ptimeframe: string
    urlstring: string
};

export type BannerListProps = {
    bid: string,
    bname: string,
    bannerurl: string,
    bstatus: string,
    bimage: string,
    btimestamp: string,
    bimageurl: string,
    documentId: string
}

export type SubscriberFormProps = {
    semail: FormElements
}

export type SearchWidgetProps = {
    searchwidget: FormElements
}