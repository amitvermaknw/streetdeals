import React, { useMemo } from "react";

type Props = {
    props: string
}

const Review = ({ props }: Props) => {

    const mapReview = useMemo(() => {
        const reviewHTML = [];
        if (props) {
            let reviewNum = Number(props);
            for (let i = 0; i < reviewNum; i++) {
                reviewHTML.push(<svg key={i} className="w-5 fill-yellow-300" viewBox="0 0 14 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>)
            }

            if (reviewNum < 5) {
                while (reviewNum < 5) {
                    reviewHTML.push(<svg key={reviewNum} className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>)
                    reviewNum++
                }
            }
        }

        return reviewHTML.map(item => item);
    }, [])


    return (<div className="flex space-x-2 ">
        {mapReview}
    </div>)
};

export default Review