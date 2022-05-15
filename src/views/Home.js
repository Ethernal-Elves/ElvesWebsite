import React, { useState } from "react"
import backImg from "../assets/images/background.png"
import discordImg from "../assets/images/discord.png"
import twitterImg from "../assets/images/twitter.png"
import openseaImg from "../assets/images/opensea.png"
import logoImg from "../assets/images/logo.png"
import light from "../assets/images/light.png"
import prime from "../assets/images/prime.png"
import dark from "../assets/images/dark.png"
import wood from "../assets/images/wood.png"
import ranger1 from "../assets/images/ranger1.png"
import ranger2 from "../assets/images/ranger.svg"
import assassin1 from "../assets/images/assassin1.png"
import druid from "../assets/images/druid.png"
import borderTop from "../assets/images/border-top.png"
import borderBottom from "../assets/images/border-bottom.png"
import navBorder from "../assets/images/header.png"
import next from "../assets/images/next.png"
import prev from "../assets/images/prev.png"
import rampage from "../assets/images/rampage.png"
import campaign from "../assets/images/campaign.png"
import crusades from "../assets/images/crusades.jpg"
import bloodthirst from "../assets/images/bloodthirst.png"
import team1 from "../assets/images/team/1.jpg"
import team2 from "../assets/images/team/2.png"
import team3 from "../assets/images/team/3.png"
import team4 from "../assets/images/team/4.png"
import team5 from "../assets/images/team/5.jpg"
import team6 from "../assets/images/team/6.jpg"
import team7 from "../assets/images/team/7.png"

import { Carousel } from "react-responsive-carousel";
import { Transition } from "@headlessui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './style.css'


const bloodline = [
    {
        title: "primeborne",
        description: "The original offspring of the Ethernal Elves, and the closest in terms of physiology to the original Elders. The Darkborne primarily mingle only with their own kind and avoided the other races, often seeing them as lesser beings. Having been the first, the Darkborne have gone through many ups and downs of civilization, experiencing wars and dark times that most Elves have only read about in historical archives. ",
        image: prime
    },
    {
        title: "darkborne",
        description: "Though dragons are extremely rare within the Ethernal Realms, they do take elven form and can pair-bond with Ethernals. Though these dragons have various skin-tones, their off-spring invariably come out purple, and have few of the powers of transformation that their dragon parentage would imply.",
        image: dark
    },
    {
        title: "lightborne",
        description: "These Ethernals sought out the most versatile people within the Realms, or were sought out themselves. The inter-marriage of Ethernals with Humans created the Lightborne. Often less serious than their Darkborne cousins, they seek out news ways to work with other nations and expand the Ethernal empire through cooperation. Typically it is the Lightborn who live among other nations cities.",
        image: light
    },
    {
        title: "woodborne",
        description: "Some Ethernals fell to ferality, having never abandoned their warrior-like nature and choosing to live amongst the animals in the forests and jungles of the Realm, to explore and hunt. These Ethernal often pair-bonded with magical were-beasts. These pairings with humanoid animals created an orange-toned Ethernal half-breed known as the Woodborne.",
        image: wood
    },
]
const founders = [
    {
        name: "0xHusky",
        role:"Co-Founder",
        social: "HuskiesNft",
        image: team1
    },
    {
        name: "Beff Jezos",
        role:"Co-Founder",
        social: "beffjezosOG",
        image: team2
    },
]
const moderators = [
    {
        name: "PullinOut4Life",
        role:"Moderator",
        social: "PullinOut4Life",
        image: team3
    },
    {
        name: "Etaytay",
        role:"Moderator",
        social: "etaytay_eth",
        image: team4
    },
    {
        name: "Seven7",
        role:"Moderator",
        social: "seven_eth",
        image: team5
    },

] 
const devs = [
    {
        name: "s17a.eth",
        role:"FrontEnd Dev",
        social: "s17a_xyz",
        image: team6
    },
    {
        name: "Dev",
        role:"FullStack Dev",
        social: "drn2369",
        image: team7
    },

]
export const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-fixed font-body min-h-[100vh] bg-bottom bg-cover bg-no-repeat bg-origin-border" style={{ backgroundImage: `url(${backImg})` }}>
            <div className="bg-[#000000dd] w-full min-h-[100vh]">
                <div className="fixed w-full z-[99999]">
                    <img className="w-full h-[20px]" src={navBorder} alt="nav" />
                    {/* page header */}
                    <div className="flex bg-[#373532dd] justify-between w-full box-border py-2 lg:px-10 px-2 lg:gap-16 -mt-2">
                        <img src={logoImg} alt="logo" />
                        <div className="lg:flex gap-2 uppercase text-white items-center text-xl flex-grow hidden">
                            <a className="custom-button min-w-[100px] px-4 py-1 text-center" href="https://app.ethernalelves.com">play</a>
                            <a className="custom-button min-w-[100px] px-4 py-1 text-center" href="#about">about</a>
                            <a className="custom-button min-w-[100px] px-4 py-1 text-center" href="#roadmap" >roadmap</a>
                            <a className="custom-button min-w-[100px] px-4 py-1 text-center" href="https://docs.ethernalelves.com/about/storyline">docs</a>
                        </div>
                        <div className="flex items-center lg:gap-3 gap-1">
                            <a href="https://twitter.com" className="w-[45px] h-[45px] rounded-full bg-[#1c130f] border border-[3px] border-[#4f4945] p-1">
                                <img className="bg-white rounded-full p-1" src={twitterImg} alt="twitter" />
                            </a>
                            <a href="https://discord.com" className="w-[45px] h-[45px] rounded-full bg-[#1c130f] border border-[3px] border-[#4f4945] p-1">
                                <img className="bg-white rounded-full p-1" src={discordImg} alt="discord" />
                            </a>
                            <a href="https://opensea.io" className="w-[45px] h-[45px] rounded-full bg-[#1c130f] border border-[3px] border-[#4f4945] p-1">
                                <img className="bg-white rounded-full p-1" src={openseaImg} alt="opensea" />
                            </a>
                            {/* <img className="lg:hidden w-[40px] h-[40px] rounded-sm bg-[#1c130f] border border-[3px] border-[#4f4945] p-1" src={MenuIcon} alt="menu" /> */}
                            <div className=" flex lg:hidden">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    type="button"
                                    className="rounded-sm bg-[#1c130f] border border-[3px] border-[#4f4945] p-1 focus:outline-none"
                                    aria-controls="mobile-menu"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    {!isOpen ? (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="#7f7975"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="block h-6 w-6"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="#7f7975"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="lg:hidden fixed w-full transition-bg bg-[#373532dd] top-[89px] h-full z-[999]" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a
                                    href="https://app.ethernalelves.com"
                                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-lg font-app font-bold"
                                >
                                    Play
                                </a>

                                <a
                                    href="#about"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-app font-bold"
                                >
                                    About
                                </a>

                                <a
                                    href="#roadmap"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-app font-bold"
                                >
                                    Roadmap
                                </a>

                                <a
                                    href="https://docs.ethernalelves.com/about/storyline"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-app font-bold"
                                >
                                    Docs
                                </a>
                            </div>
                        </div>
                    )}
                </Transition>

                {/* page content */}
                <div className="flex flex-col xl:px-24 px-4 pt-12" >
                    {/* hero */}
                    <section className="text-gray-400 body-font">
                        <div className="container mx-auto flex px-5 md:pt-32 pt-12 md:flex-row gap-8 flex-col items-center">
                            <div className="flex flex-col max-w-sm">
                                <img className="z-[1]" src={borderTop} alt="border-top" />
                                <img className="object-cover object-center -my-[6px] px-8 bg-black pt-8" alt="hero" src={ranger2} data-xblocker="passed" style={{ visibility: "visible" }} />
                                <img className="z-[1]" src={borderBottom} alt="border-top" />
                            </div>
                            <div className="lg:flex-grow lg:w-1/2 lg:pl-24 lg:pl-16 flex flex-col lg:items-start lg:text-left items-center text-center gap-4">
                                <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                                    <img src={borderTop} alt="border-top" />
                                    <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">ETHERNAL ELVES
                                    </h1>
                                    <img className="w-5/6" src={borderBottom} alt="border-top" />
                                </div>
                                <p className="mb-8 lg:text-3xl md:text-2xl text-xl leading-relaxed text-white font-five-nine font-medium">In the beginning there was only eternal cold and darkness… Until one day, the spark of the First Light exploded through the universe and was refracted in The Crystal of Eternity. From that singular beam, an entire universe was born, and within that universe, life formed all at once across an infinite sea of stars.</p>
                                <div className="flex flex-col items-center justify-center w-full">
                                    <button className="py-2 px-6 focus:outline-none hover:bg-slate-300 text-lg uppercase custom-button">Learn more</button>
                                    <div className="animate-bounce mt-4">
                                        <button onClick={() => { window.location.href = "#about" }} className="h-[25px] w-[25px] border-b-8 border-r-8 border-white rotate-45"></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* about */}
                    <div className="flex flex-col xl:max-w-5xl w-full mx-auto md:pt-24 pt-12" id="about">
                        <img className="z-[1] lg:w-full mx-auto" src={borderTop} alt="border-top" />
                        <div className="flex flex-col paper touch-pan-y bg-100 w-full md:-mb-[20px] md:-mt-[16px] -mt-[2%] -mb-[2%] py-6 px-4">
                            <Carousel
                                showArrows={true}
                                showThumbs={false}
                                showStatus={false}
                                renderArrowNext={(onNext, hasNext, label) =>
                                    hasNext && <button className="control-arrow right-0 flex flex-col items-center justify-center self-center" onClick={onNext}>
                                        <img className="max-w-[30px]" src={next} alt="next arrow" />
                                    </button>
                                }
                                renderArrowPrev={(onPrev, hasPrev, label) =>
                                    hasPrev && <button className="control-arrow left-0 flex flex-col items-center justify-center" onClick={onPrev}>
                                        <img className="max-w-[30px]" src={prev} alt="prev arrow" />
                                    </button>
                                }

                            >
                                <section className="flex items-center flex-col lg:px-12">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">History
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center gap-4">
                                            <p className="mb-8 text-xl text-left leading-relaxed font-medium font-five-nine">The Ethernal Elves, or The First Ones, peacefully wandered the Ethernal realms for many many centuries, participating in a variety of wars and incidents. In the Ninth Meta War, the First Ones became weary of bloodshed, and their dwindling members took a pact to set aside their war-like tendencies and create a settlement. The civilization that sprung forth from the Ethernal Elves was unlike any the Realm had ever seen before. Massive cities filled with technology indistinguishable from magic filled the world, and the Ethernal Elves, finally comfortable and feeling safe… began to bond and bare children, both among themselves and with other species who sought to have them as partners due to their miraculous command of arcane energies and plant-based remedies.</p>
                                        </div>
                                    </div>

                                </section>
                                {/* bloodline */}
                                <section className="flex text-gray-400 body-font flex-col items-center lg:px-12">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">Bloodline-{bloodline[0].title}
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="container flex lg:flex-row flex-col items-center md:mt-5 mt-1 mx-6">
                                        <div className="sm:max-w-xs max-w-[250px] md:mb-0 border-image pb-8 pt-10 px-10">
                                            <img className="object-cover object-center sm:w-[200px] sm:h-[200px]" alt="hero" src={bloodline[0].image} />
                                        </div>
                                        <div className="flex lg:flex-grow lg:w-1/2 lg:pl-12 lg:pl-6 gap-8">
                                            <div className="leading-relaxed font-medium w-full flex items-center justify-center text-xl font-five-nine text-black">{bloodline[0].description}</div>
                                        </div>
                                    </div>
                                </section>
                                {/* bloodline */}
                                <section className="flex text-gray-400 body-font flex-col items-center lg:px-12">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">Bloodline-{bloodline[1].title}
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="container flex lg:flex-row flex-col items-center md:mt-5 mt-1 mx-6">
                                        <div className="sm:max-w-xs max-w-[250px] md:mb-0 border-image pb-8 pt-10 px-10">
                                            <img className="object-cover object-center sm:w-[200px] sm:h-[200px]" alt="hero" src={bloodline[1].image} />
                                        </div>
                                        <div className="flex lg:flex-grow md:w-1/2 lg:pl-12 md:pl-6 gap-8">
                                            <div className="leading-relaxed font-medium w-full flex items-center justify-center text-xl font-five-nine text-black">{bloodline[1].description}</div>
                                        </div>
                                    </div>
                                </section>
                                {/* bloodline */}
                                <section className="flex text-gray-400 body-font flex-col items-center lg:px-12">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">Bloodline-{bloodline[2].title}
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="container flex lg:flex-row flex-col items-center md:mt-5 mt-1 mx-6">
                                        <div className="sm:max-w-xs max-w-[250px] md:mb-0 border-image pb-8 pt-10 px-10">
                                            <img className="object-cover object-center sm:w-[200px] sm:h-[200px]" alt="hero" src={bloodline[2].image} />
                                        </div>
                                        <div className="flex lg:flex-grow md:w-1/2 lg:pl-12 md:pl-6 gap-8">
                                            <div className="leading-relaxed font-medium w-full flex items-center justify-center text-xl font-five-nine text-black">{bloodline[2].description}</div>
                                        </div>
                                    </div>
                                </section>
                                {/* bloodline */}
                                <section className="flex text-gray-400 body-font flex-col items-center lg:px-12">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">Bloodline-{bloodline[3].title}
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="container flex lg:flex-row flex-col items-center md:mt-5 mt-1 mx-6">
                                        <div className="sm:max-w-xs max-w-[250px] md:mb-0 border-image pb-8 pt-10 px-10">
                                            <img className="object-cover object-center sm:w-[200px] sm:h-[200px]" alt="hero" src={bloodline[3].image} />
                                        </div>
                                        <div className="flex lg:flex-grow md:w-1/2 lg:pl-12 md:pl-6 gap-8">
                                            <div className="leading-relaxed font-medium w-full flex items-center justify-center text-xl font-five-nine text-black">{bloodline[3].description}</div>
                                        </div>
                                    </div>
                                </section>

                                {/* age of civility */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">The AGE OF CIVILITY
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center gap-4">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium"> Over the centuries, these blood-lines remained mostly divided until the peak of Ethernal civilization brought them all together under The Kingdom. Though the city was focused on advancements, all Ethernal were welcome there, and the four bloodlines would often participate in politics, civic duties, and defense strategies together. Though the Woodborne would often warn that their armies were in a dilapidated state, the general peace throughout the realm caused most to ignore their concerns.</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">The AGE OF CIVILITY
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">The heroes of the Ninth Meta War, being the last of the original Ethernal Elves, soon began to departretire to a more contemplative and philosophical life. They were wisened and powerful far beyond the mere centuries of the majority, and became known as The Elders. Their advice was sought only in times of dire need, and most began to retire more and more to the sanctum of the Inner Kingdom, within an arcane fortress called The Citadel of Lost Dreams, where they were said to bathe in the light of the universe.</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">The AGE OF CIVILITY
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">Within the Citadel, it is said that The Elders would commune with the greater universe through a Soul Prism. A powerful artifact discovered by the Elders in ancient times that both lengthened their already long life-spans, but also advised them in times of darkness and despair. Though only The Elders were allowed to use it.</p>
                                        </div>
                                    </div>
                                </section>
                                {/* meeting of the mires */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">meeting of the mires
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center gap-4">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium"> So it was that the Mires one day appeared on the outskirts of the Ethernal nation. Outsiders who had never been seen before within the known Realms. The Elves welcomed them with open arms and divided resources and land to ensure a peaceful co-existence, efforts which were led by the trusting Lightborne. As time passed, the Mires learned the Ethernal language, stories, and even their technology and magic.
                                                The Mires seemed at the surface indifferent but accommodating. The Woodborne distrusted them, but the other bloodlines saw them either as new friends or an insignificant and irrelevant people. As it would turn out, they were all mistaken.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* the blood vendetta */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">the blood vendetta
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">  On a calm day like any other, the Mires marched into the Ethernal Kingdom, armed to the teeth with the weapons and arcane spells of the Ethernal Elves… given in a time of peace. Much blood was shed that day, as the Mires systematically exterminated the elves, causing them to panic and push deep into the city, and eventually the Inner Kingdom. </p>

                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">The Mires cursed the Ethernals and bade them die for the thousands of years of bloodshed they had committed in ages past. For the Mires had been born from the blending of blood and the mycellial network of the world, to take vengeance upon the Ethernals for their murderous past.</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">the blood vendetta
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center gap-4">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">As the Mires rampant and unabated executions closed down around the Ethernal elves’ home, the Elders awoke from their deep contemplative states to defend the last of their people. They formed a circle at the borders of the Inner Kingdom and channeled their ancient powers into the Soul Prism. An artifact from the first born that was long forgotten from the memories of most. It is said that a blinding flash of light was emitted that caused the Mires to burn and flee. One amongst the Mires however, stronger than the rest, was able to take the Soul Prism before the Great Barrier pushed him out of the Inner Kingdom forever.</p>
                                        </div>
                                    </div>
                                </section>
                                {/* THE BARRIER AND THE SACRIFICE */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">THE BARRIER AND THE SACRIFICE
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">Where the Elders once stood, crystal statues now remained, beautiful and bold, as the heroes they once were, but frozen in their defense of the city to maintain the Great Barrier that protected the Ethernals inner-most secrets. The shimmering colorful lights of the Great Barrier could be seen throughout the land as a warning to others not to enter the Inner Kingdom.</p>

                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">From that day forward, none that did not have the bloodline of the Ethernals could step foot in the Inner Kingdom, thus protecting the Ethernal bloodlines from further attacks by the Mires, or any other nation that might seek to destroy them in their weakened state.</p>
                                        </div>
                                    </div>
                                </section>

                                {/* mire cravens */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">mire cravens
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center gap-4">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium"> The Mires left with nearly all of the Ethernals valuable weapons, arcane books, and resources, having systematically taken all that they could find in their planned attack. With the barrier in place, they knew they would not be able to finish their genocide, so as they left they planted seeds that would bear horrendous fruit. Monsters created from Mire blood and blended with plants formed voracious creatures that would tear any elf that ventured near it.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* dawn of the sentinels */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">DAWN OF THE SENTINELS

                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium"> Centuries passed, but the thievery and threat of the Mires lurks omnipresent in the historical texts of the four bloodlines. Seeking vengeance for past events, a new group is formed to protect the Ethernal homelands and push out into their lost territory. This group, named The Sentinels, takes members from all four bloodlines.
                                                The Sentinel’s goal is to increase their numbers, build their forces and, once ready, leave their homelands behind to search for and eradicate the Mires. They will take vengeance and return the artifacts of their ancestors. Some even hope to reverse the spell that has taken The Elders, their vaunted heroes of old, and return them to their true form.

                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* THE JOURNEY SET FORTH */}
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">THE JOURNEY SET FORTH
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium"> Many dangers await the Sentinels on their journey, as the Mires creatures are bred to murder the elves. However, slain creatures contain $MIREN, a mineral rich blood that can be utilized to bolster the elves. Weapon caches lost in the wars, or left behind by the Mires can be found and raided by the Sentinels. Eventually, they may hold the power they need to overtake the Mires, wherever they may lurk.</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="flex items-center flex-col lg:px-12 pb-10">
                                    <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-6">THE JOURNEY SET FORTH
                                    </h1>
                                    {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                    <div className="flex flex-row mt-5 gap-8">
                                        <div className="flex flex-col md:items-center items-center text-center">
                                            <p className="text-xl text-left leading-relaxed font-five-nine text-black font-medium">Though The Elders remain still in their crystallized forms, known as a Kyvist Stone, The Sentinels realized it may not be forever. Though their ancient texts were mostly stolen, runes within the Citadel of Lost Dreams speak of the Great Barrier spell, and a method of reversal. The Sentinels must first acquire other ancient tomes that the Mires had stolen with the incantations of all The Elders. Then find the Soul Prism through which they can channel the incantations and finally free their heroes of old.</p>
                                        </div>
                                    </div>
                                </section>
                            </Carousel>
                        </div>
                        <img className="z-[1] w-full mx-auto" src={borderBottom} alt="border-top" />
                    </div>
                    {/* SENTINELS */}
                    <section className="flex items-center flex-col md:px-5 px-2 py-12 sm:mt-12 gap-8">
                        <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                            <img src={borderTop} className="md:max-w-2xl" alt="border-top" />
                            <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">SENTINELS
                            </h1>
                            <img className="w-5/6 md:max-w-xl" src={borderBottom} alt="border-top" />
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
                            <div className="sentinel flex flex-col items-center px-4 py-4 gap-y-6">
                                <span className="text-3xl text-white font-app">DRUIDS</span>
                                <img className="min-w-[240px]" src={druid} alt="sentinels" />
                            </div>
                            <div className="sentinel flex flex-col items-center px-4 py-4 gap-y-6">
                                <span className="text-3xl text-white font-app">ASSASSINS</span>
                                <img className="min-w-[240px]" src={assassin1} alt="sentinels" />
                            </div>
                            <div className="sentinel flex flex-col items-center px-4 py-4 gap-y-6">
                                <span className="text-3xl text-white font-app">RANGERS</span>
                                <img className="min-w-[240px]" src={ranger1} alt="sentinels" />
                            </div>
                        </div>
                    </section>
                    {/*GAME MODES*/}
                    <section className="flex items-center flex-col md:px-5 px-2 py-12 gap-8">
                        <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                            <img src={borderTop} className="md:max-w-2xl" alt="border-top" />
                            <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">GAME MODES
                            </h1>
                            <img className="w-5/6 md:max-w-xl" src={borderBottom} alt="border-top" />
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center sm:items-stretch justify-center">
                            <div className="sentinel flex flex-col items-center pr-[23px] pl-[22px] sm:pr-[44px] sm:pl-[42px] py-4 sm:pt-8 sm:pb-4">
                                <span className="text-4xl text-white font-app">BLOODTHIRST</span>
                                <img className="w-[300px] h-[170px] sm:w-[600px] sm:h-[340px] mt-[15px] sm:mt-[34px]" src={bloodthirst} alt="gamemodes" />
                                <p className="w-[300px] h-[84px] sm:h-[68px] sm:w-[600px] font-five-nine text-white text-xl sm:text-2xl my-4 text-center">
                                    Earn $REN upfront for slaying creatures, based on Sentinel weapon tiers.
                                </p>
                            </div>
                            <div className="sentinel flex flex-col items-center pr-[23px] pl-[22px] sm:pr-[44px] sm:pl-[42px] py-4 sm:pt-8 sm:pb-4">
                                <span className="text-4xl text-white font-app">RAMPAGE</span>
                                <img className="w-[300px] h-[170px] sm:w-[600px] sm:h-[340px] mt-[15px] sm:mt-[34px]" src={rampage} alt="gamemodes" />
                                <p className="w-[300px] h-[84px] sm:h-[68px] sm:w-[600px] font-five-nine text-white text-xl sm:text-2xl my-4 text-center">
                                    Burn $REN to gain levels, weapons, and accessories.  The worthy will receive rare accessories with special utility.
                                </p>
                            </div>
                            <div className="sentinel flex flex-col items-center pr-[23px] pl-[22px] sm:pr-[44px] sm:pl-[42px] py-4 sm:pt-8 sm:pb-4">
                                <span className="text-4xl text-white font-app">CAMPAIGNS</span>
                                <img className="w-[300px] h-[170px] sm:w-[600px] sm:h-[340px] mt-[15px] sm:mt-[34px]" src={campaign} alt="gamemodes" />
                                <p className="w-[300px] h-[84px] sm:h-[68px] sm:w-[600px] font-five-nine text-white text-xl sm:text-2xl my-4 text-center">
                                    Earn $REN upfront, find weapons, and level up for slaying creatures.
                                </p>
                            </div>
                            <div className="sentinel flex flex-col items-center pr-[23px] pl-[22px] sm:pr-[44px] sm:pl-[42px] py-4 sm:pt-8 sm:pb-4">
                                <span className="text-4xl text-white font-app">CRUSADES</span>
                                <img className="w-[300px] h-[170px] sm:w-[600px] sm:h-[340px] mt-[15px] sm:mt-[34px]" src={crusades} alt="gamemodes" />
                                <p className="w-[300px] h-[84px] sm:h-[68px] sm:w-[600px] font-five-nine text-white text-xl sm:text-2xl my-4 text-center">
                                    Use $REN  and go on Crusades to search for Artifacts.  Artifacts are used to mint Elders, the next Genesis Collection and future Collections.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ROADMAP */}
                    <section className="flex items-center flex-col md:px-5 px-2 py-12" id="roadmap">
                        <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                            <img src={borderTop} className="md:max-w-2xl" alt="border-top" />
                            <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">ROADMAP
                            </h1>
                            <img className="w-5/6 md:max-w-xl" src={borderBottom} alt="border-top" />
                        </div>
                        <div className="flex flex-col xl:max-w-4xl w-full mx-auto mt-8">
                            <img className="z-[1] mx-auto" src={borderTop} alt="border-top" />
                            <div className="flex flex-col paper touch-pan-y bg-100 w-full md:-mb-[20px] md:-mt-[16px] -mt-[2%] -mb-[2%] py-6 px-4">
                                <Carousel
                                    showArrows={true}
                                    showThumbs={false}
                                    showStatus={false}
                                    renderArrowNext={(onNext, hasNext, label) =>
                                        hasNext && <button className="control-arrow right-0 flex flex-col items-center justify-center" onClick={onNext}>
                                            <img className="max-w-[30px]" src={next} alt="next arrow" />
                                        </button>
                                    }
                                    renderArrowPrev={(onPrev, hasPrev, label) =>
                                        hasPrev && <button className="control-arrow left-0 flex flex-col items-center justify-center" onClick={onPrev}>
                                            <img className="max-w-[30px]" src={prev} alt="prev arrow" />
                                        </button>
                                    }

                                >
                                    <section className="flex items-center flex-col lg:px-12 my-4 md:my-16">
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">CHAPTER 1
                                        </h1>
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">
                                            DAWN OF THE SENTINELS
                                        </h1>
                                        {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                        <div className="flex flex-row md:mt-12 mt-5 gap-8">
                                            <div className="flex flex-col md:items-start items-center text-center gap-4 my-4 px-4">
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Initial mint of 6,666 Sentinels assembled to fight against the Mire's creatures.
                                                </p>
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Developed a gamified rarity NFT game and earned rewards through multiple game modes such as Campaigns, Bloodthirst, Rampage, and many more.
                                                </p>
                                            </div>
                                        </div>

                                    </section>
                                    <section className="flex items-center flex-col lg:px-12 my-4 md:my-16">
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">CHAPTER 2
                                        </h1>
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">
                                            RELEASE THE ELDERS
                                        </h1>
                                        {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                        <div className="flex flex-row md:mt-12 mt-5 gap-8">
                                            <div className="flex flex-col md:items-start items-center text-center gap-4 my-4 px-4">
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Mint 2,222 Elders and acquire resources to help Elders unlock their full potential with weaponry, armor, and abilities.
                                                </p>
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    $MOON Token launch for LP incentives, special in-game utility, and governance.
                                                </p>
                                            </div>
                                        </div>

                                    </section>
                                    <section className="flex items-center flex-col lg:px-12 my-4 md:my-16">
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">CHAPTER 3
                                        </h1>
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">
                                            THE ELVEN SETTLEMENT
                                        </h1>
                                        {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                        <div className="flex flex-row md:mt-12 mt-5 gap-8">
                                            <div className="flex flex-col md:items-start items-center text-center gap-4 my-4 px-4">
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Elder will be able to own Land and Sentinels will have the ability to create Buildings. Additional Buildings to be minted by other communities.
                                                </p>
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Stake, earn, &amp; upgrade buildings and artillery.
                                                </p>
                                            </div>
                                        </div>

                                    </section>
                                    <section className="flex items-center flex-col lg:px-12 my-4 md:my-16">
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">CHAPTER 4
                                        </h1>
                                        <h1 className="title-font md:text-5xl text-3xl font-app uppercase text-transparent border-text tracking-widest my-0">
                                            SEIGE OF THE MIRES
                                        </h1>
                                        {/* <img className="mt-4 max-w-xs" src={divider} alt="divider" /> */}
                                        <div className="flex flex-row md:mt-12 mt-5 gap-8">
                                            <div className="flex flex-col md:items-start items-center text-center gap-4 my-4 px-4">
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    A unique collection that incorporates the first rewards based burn function which will determine the Difficulty of Game Modes in Elves.
                                                </p>
                                                <p className="text-xl sm:text-2xl text-left leading-relaxed font-five-nine text-black font-medium">
                                                    Mint 2,222 Mires to challenge the Elders and fight for land.
                                                </p>
                                            </div>
                                        </div>

                                    </section>
                                </Carousel>
                            </div>
                            <img className="z-[1] w-full mx-auto" src={borderBottom} alt="border-top" />
                        </div>
                    </section>
                    {/* ELDERS */}
                    <section className="flex items-center flex-col md:px-5 px-2 py-12 md:max-w-3xl gap-8 mx-auto">
                        <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                            <img src={borderTop} className="md:max-w-2xl" alt="border-top" />
                            <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">ELDERS
                            </h1>
                            <img className="w-5/6 md:max-w-xl" src={borderBottom} alt="border-top" />
                        </div>
                        <div className="flex flex-row mt-4 gap-8">
                            <div className="flex flex-col md:items-center items-center text-center">
                                <p className="mb-8 lg:text-3xl md:text-2xl text-xl  leading-relaxed text-white font-five-nine font-medium"> Many dangers await the Sentinels on their journey, as the Mires creatures are bred to murder the elves. However, slain creatures contain $MIREN, a mineral rich blood that can be utilized to bolster the elves. Weapon caches lost in the wars, or left behind by the Mires can be found and raided by the Sentinels. Eventually, they may hold the power they need to overtake the Mires, wherever they may lurk.</p>
                            </div>
                        </div>
                    </section>
                    {/* TEAM */}
                    <section className="flex items-center flex-col md:px-5 px-2 py-12 gap-8">
                        <div className="flex flex-col items-center gap-3 md:mx-12 mx-2">
                            <img src={borderTop} className="md:max-w-2xl" alt="border-top" />
                            <h1 className="title-font md:text-7xl text-5xl text-transparent font-app border-text text-center">TEAM
                            </h1>
                            <img className="w-5/6 md:max-w-xl" src={borderBottom} alt="border-top" />
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
                            {
                                founders.map((user, index) =>
                                    <div className="flex flex-col items-center gap-1" key={index}>
                                        <div className="sm:max-w-xs max-w-[280px] md:mb-0 border-image p-10">
                                            <img className="md:w-[240px] md:h-[240px] object-cover object-center" alt="hero" src={user.image} />
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.name}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.role}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">Twitter: <a className="text-[#b7b4ab]" href={`https://twitter.com/${user.social}`} rel="noreferrer" target="_blank">@{user.social}</a></p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
                            {
                                moderators.map((user, index) =>
                                    <div className="flex flex-col items-center gap-1" key={index}>
                                        <div className="sm:max-w-xs max-w-[280px] md:mb-0 border-image p-10">
                                            <img className="md:w-[240px] md:h-[240px] object-cover object-center" alt="hero" src={user.image} />
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.name}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.role}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">Twitter: <a className="text-[#b7b4ab]" href={`https://twitter.com/${user.social}`} rel="noreferrer" target="_blank">@{user.social}</a></p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-12 items-center justify-center">
                            {
                                devs.map((user, index) =>
                                    <div className="flex flex-col items-center gap-1" key={index}>
                                        <div className="sm:max-w-xs max-w-[280px] md:mb-0 border-image p-10">
                                            <img className="md:w-[240px] md:h-[240px] object-cover object-center" alt="hero" src={user.image} />
                                        </div>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.name}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">{user.role}</p>
                                        <p className="text-2xl sm:text-3xl font-five-nine text-white">Twitter: <a className="text-[#b7b4ab]" href={`https://twitter.com/${user.social}`} rel="noreferrer" target="_blank">@{user.social}</a></p>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </div>

            </div>
        </div>
    )
}   
