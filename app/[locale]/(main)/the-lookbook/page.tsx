import { AnimatedSectionHeader } from "@/components/ui/section-header"
import { LookBookGrid } from "./_components/LookbookGrid"
import ReviewsButton from "./_components/ReviewsButton"
import OpenInquiriesButton from "./_components/OpenInquiriesButton"

const page = () => {
    return (
        <main className="bg-[#F5F5F0]">
            <section className="pt-24 pb-0 px-4">
                <AnimatedSectionHeader
                    topText="Discovery feed"
                    middleText="The Lookbook"
                    bottomText="Real reviews from real bodies. Ranked by your measurement match."
                />
            </section>
            <div className="container mx-auto flex justify-start items-center gap-4 pt-10">
                <ReviewsButton />
                <OpenInquiriesButton />
            </div>
            <LookBookGrid />
        </main>
    )
}

export default page