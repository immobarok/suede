import { AnimatedSectionHeader } from "@/components/ui/section-header"

const page = () => {
    return (
        <main>
            <section className="py-24 px-4 bg-[#F5F5F0]">
                <AnimatedSectionHeader
                    topText="BRAND DIRECTORY"
                    middleText="The Capsule"
                    bottomText="A curated collection of minority-owned fashion brands, each vetted for quality, ethics, and design excellence."
                />
            </section>
        </main>
    )
}

export default page