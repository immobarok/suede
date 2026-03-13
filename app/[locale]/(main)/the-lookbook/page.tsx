import { AnimatedSectionHeader } from "@/components/ui/section-header"
import { LookBookGrid } from "./_components/LookbookGrid"
import ReviewsButton from "./_components/ReviewsButton"
import Inqueries from "./_components/inqueries"
import OpenInquiriesButton from "./_components/OpenInquiriesButton"
import SortBy from "./_components/SortBy"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const page = async (props: {
    searchParams: SearchParams
}) => {
    const searchParams = await props.searchParams;
    const view = searchParams.view;

    return (
        <main className="bg-[#F5F5F0]">
            <section className="pt-24 pb-0 px-4">
                <AnimatedSectionHeader
                    topText="Discovery feed"
                    middleText="The Lookbook"
                    bottomText="Real reviews from real bodies. Ranked by your measurement match."
                />
            </section>
            <div className="container mx-auto flex justify-between items-center pt-10 px-4">
                <div className="flex items-center gap-6">
                    <ReviewsButton />
                    <OpenInquiriesButton />
                </div>
                <SortBy />
            </div>
            {view === 'open-inquiries' ? <Inqueries /> : <LookBookGrid />}
        </main>
    )
}

export default page
