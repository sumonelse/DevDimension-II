import React, { useState, useEffect } from "react"

const CompetitiveProgramming = () => {
    // Animation for counting up statistics
    const [animatedStats, setAnimatedStats] = useState({
        problems: 0,
        contests: 0,
        rating: 0,
        rank: 0,
    })

    // Replace these with your actual statistics
    const finalStats = {
        problems: 500,
        contests: 75,
        rating: 1850,
        rank: 5, // Top 5%
    }

    // Platforms with your profiles
    const platforms = [
        {
            name: "Codeforces",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                >
                    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9 0c.828 0 1.5.672 1.5 1.5v6c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-6c0-.828.673-1.5 1.5-1.5h3zm9 0c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V9c0-.828.672-1.5 1.5-1.5h3z" />
                </svg>
            ),
            username: "sumit_maurya",
            rating: "Specialist (1850)",
            color: "text-cyan-400",
            link: "https://codeforces.com/profile/sumit_maurya",
        },
        {
            name: "LeetCode",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                >
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744.603 0 1.2-.229 1.714-.744.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823L15.872 3.7c-1.572-1.572-3.656-2.434-5.872-2.434s-4.3.862-5.872 2.434L.973 7.894C.352 8.516 0 9.422 0 10.5s.352 1.984.973 2.606l3.155 3.155c1.572 1.572 3.656 2.434 5.872 2.434s4.3-.862 5.872-2.434l3.155-3.155c.514-.514.75-1.146.75-1.823s-.236-1.309-.75-1.823c-.514-.514-1.111-.744-1.714-.744-.603 0-1.2.229-1.714.744z" />
                </svg>
            ),
            username: "sumit_maurya",
            rating: "Knight (1950)",
            color: "text-amber-400",
            link: "https://leetcode.com/sumit_maurya/",
        },
        {
            name: "CodeChef",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-current"
                >
                    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.148.701.329 1.063.467.142.051.303.134.446.054a.558.558 0 00.124-.163c.185-.399.337-.813.535-1.207.591-1.072.928-2.255 1.294-3.416.39-1.256.829-2.497 1.197-3.759.16-.585.34-1.176.376-1.786-.009-.571-.148-1.152-.457-1.638-.173-.223-.307-.483-.529-.662-.514-.434-1.179-.612-1.814-.788a12.272 12.272 0 01-1.864-.703c-.707-.315-1.435-.654-2.222-.685a1.83 1.83 0 00-.091 0zM11.25.29h.046c.621.033 1.193.328 1.77.595.659.289 1.33.536 1.975.84.314.136.643.271.901.491.141.12.231.282.341.431.169.293.27.622.288.957-.022.473-.166.93-.292 1.384-.338 1.155-.742 2.285-1.114 3.428-.345 1.098-.663 2.214-1.192 3.235-.155.295-.289.602-.451.894-.38-.155-.786-.271-1.177-.414-.607-.198-1.226-.342-1.857-.33-.636.012-1.255.156-1.862.354-.391.143-.797.259-1.177.414-.162-.292-.296-.599-.451-.894-.529-1.021-.847-2.137-1.192-3.235-.372-1.143-.776-2.273-1.114-3.428-.126-.454-.27-.911-.292-1.384.018-.335.119-.664.288-.957.11-.149.2-.311.341-.431.258-.22.587-.355.901-.491.645-.304 1.316-.551 1.975-.84.577-.267 1.149-.562 1.77-.595h.046a.29.29 0 01.046 0zM8.575 5.11c-.227-.067-.486.014-.62.207-.118.168-.126.393-.159.596-.044.628.033 1.268.222 1.872.207.644.472 1.287.933 1.802.184.199.401.361.59.554.126.118.24.252.38.35.142.097.358.118.487-.016.11-.116.09-.294.035-.432-.097-.212-.243-.397-.358-.598-.222-.364-.369-.77-.422-1.184-.035-.276-.043-.555-.026-.832.017-.216.035-.44.106-.647.056-.168.184-.304.191-.487.007-.177-.09-.338-.209-.45-.128-.104-.283-.177-.446-.199a1.256 1.256 0 00-.704.465zM15.672 5.11c-.227-.067-.486.014-.62.207-.118.168-.126.393-.159.596-.044.628.033 1.268.222 1.872.207.644.472 1.287.933 1.802.184.199.401.361.59.554.126.118.24.252.38.35.142.097.358.118.487-.016.11-.116.09-.294.035-.432-.097-.212-.243-.397-.358-.598-.222-.364-.369-.77-.422-1.184-.035-.276-.043-.555-.026-.832.017-.216.035-.44.106-.647.056-.168.184-.304.191-.487.007-.177-.09-.338-.209-.45-.128-.104-.283-.177-.446-.199a1.256 1.256 0 00-.704.465zM12.127 5.198c-.227-.067-.486.014-.62.207-.118.168-.126.393-.159.596-.044.628.033 1.268.222 1.872.207.644.472 1.287.933 1.802.184.199.401.361.59.554.126.118.24.252.38.35.142.097.358.118.487-.016.11-.116.09-.294.035-.432-.097-.212-.243-.397-.358-.598-.222-.364-.369-.77-.422-1.184-.035-.276-.043-.555-.026-.832.017-.216.035-.44.106-.647.056-.168.184-.304.191-.487.007-.177-.09-.338-.209-.45-.128-.104-.283-.177-.446-.199a1.256 1.256 0 00-.704.465zM6.641 11.232a1.025 1.025 0 00-.392.08c-.217.093-.365.293-.482.488-.18.345-.243.744-.243 1.134 0 .39.063.788.243 1.134.117.195.265.395.482.488.217.093.457.093.674 0 .217-.093.365-.293.482-.488.18-.346.243-.744.243-1.134 0-.39-.063-.789-.243-1.134-.117-.195-.265-.395-.482-.488a1.025 1.025 0 00-.282-.08zm2.464 0a1.025 1.025 0 00-.392.08c-.217.093-.365.293-.482.488-.18.345-.243.744-.243 1.134 0 .39.063.788.243 1.134.117.195.265.395.482.488.217.093.457.093.674 0 .217-.093.365-.293.482-.488.18-.346.243-.744.243-1.134 0-.39-.063-.789-.243-1.134-.117-.195-.265-.395-.482-.488a1.025 1.025 0 00-.282-.08zm2.464 0a1.025 1.025 0 00-.392.08c-.217.093-.365.293-.482.488-.18.345-.243.744-.243 1.134 0 .39.063.788.243 1.134.117.195.265.395.482.488.217.093.457.093.674 0 .217-.093.365-.293.482-.488.18-.346.243-.744.243-1.134 0-.39-.063-.789-.243-1.134-.117-.195-.265-.395-.482-.488a1.025 1.025 0 00-.282-.08zm2.464 0a1.025 1.025 0 00-.392.08c-.217.093-.365.293-.482.488-.18.345-.243.744-.243 1.134 0 .39.063.788.243 1.134.117.195.265.395.482.488.217.093.457.093.674 0 .217-.093.365-.293.482-.488.18-.346.243-.744.243-1.134 0-.39-.063-.789-.243-1.134-.117-.195-.265-.395-.482-.488a1.025 1.025 0 00-.282-.08zm2.464 0a1.025 1.025 0 00-.392.08c-.217.093-.365.293-.482.488-.18.345-.243.744-.243 1.134 0 .39.063.788.243 1.134.117.195.265.395.482.488.217.093.457.093.674 0 .217-.093.365-.293.482-.488.18-.346.243-.744.243-1.134 0-.39-.063-.789-.243-1.134-.117-.195-.265-.395-.482-.488a1.025 1.025 0 00-.282-.08z" />
                </svg>
            ),
            username: "sumit_maurya",
            rating: "5★ (1950)",
            color: "text-pink-400",
            link: "https://www.codechef.com/users/sumit_maurya",
        },
    ]

    // Sample achievements - replace with your actual achievements
    const achievements = [
        {
            title: "Google Kickstart",
            description: "Ranked in the top 10% globally in Round E 2023",
            icon: "🏆",
        },
        {
            title: "ICPC Regionals",
            description: "Qualified for Asia Regional Contest 2022",
            icon: "🌏",
        },
        {
            title: "Codeforces",
            description: "Achieved Specialist rating (1850+)",
            icon: "📈",
        },
        {
            title: "Hackathons",
            description: "Won 3 national-level coding competitions",
            icon: "🥇",
        },
    ]

    // Sample code snippet - replace with your own impressive algorithm
    const codeSnippet = `// Efficient solution for Maximum Subarray Sum (Kadane's Algorithm)
function maxSubArraySum(arr) {
  let maxSoFar = arr[0];
  let maxEndingHere = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}`

    // Animate the statistics counting up
    useEffect(() => {
        const duration = 2000 // 2 seconds
        const steps = 50
        const stepTime = duration / steps

        const timer = setInterval(() => {
            setAnimatedStats((prevStats) => {
                const newStats = { ...prevStats }
                let completed = true

                Object.keys(finalStats).forEach((key) => {
                    if (newStats[key] < finalStats[key]) {
                        const increment = Math.ceil(finalStats[key] / steps)
                        newStats[key] = Math.min(
                            newStats[key] + increment,
                            finalStats[key]
                        )
                        completed = false
                    }
                })

                if (completed) {
                    clearInterval(timer)
                }

                return newStats
            })
        }, stepTime)

        return () => clearInterval(timer)
    }, [])

    return (
        <section
            id="competitive-programming"
            className="py-24 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2MmgtMnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem0yIDBIMzZ2Mmgtc3YtMnptMC00aDJ2MmgtMnYtMnptMiAwaDJ2MmgtMnYtMnptMi00aDJ2MmgtMnYtMnptMCAwaDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-500/5 rounded-bl-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                        Competitive{" "}
                        <span className="text-gradient-purple">
                            Programming
                        </span>
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-purple mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My journey through algorithmic challenges and coding
                        competitions has sharpened my problem-solving skills and
                        efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Stats and platforms */}
                    <div className="reveal" style={{ animationDelay: "0.1s" }}>
                        {/* Stats cards */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="glass-dark p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-purple-500/5">
                                <h3 className="text-4xl font-bold text-gradient-purple mb-2 group-hover:scale-110 transition-transform duration-500">
                                    {animatedStats.problems}+
                                </h3>
                                <p className="text-gray-400">Problems Solved</p>
                            </div>
                            <div className="glass-dark p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-cyan-500/5">
                                <h3 className="text-4xl font-bold text-gradient-cyan mb-2 group-hover:scale-110 transition-transform duration-500">
                                    {animatedStats.contests}+
                                </h3>
                                <p className="text-gray-400">
                                    Contests Participated
                                </p>
                            </div>
                            <div className="glass-dark p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-pink-500/5">
                                <h3 className="text-4xl font-bold text-gradient-pink mb-2 group-hover:scale-110 transition-transform duration-500">
                                    {animatedStats.rating}
                                </h3>
                                <p className="text-gray-400">Max Rating</p>
                            </div>
                            <div className="glass-dark p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 text-center group hover:shadow-lg hover:shadow-amber-500/5">
                                <h3 className="text-4xl font-bold text-gradient-amber mb-2 group-hover:scale-110 transition-transform duration-500">
                                    Top {animatedStats.rank}%
                                </h3>
                                <p className="text-gray-400">Global Ranking</p>
                            </div>
                        </div>

                        {/* Platforms */}
                        <h3 className="text-xl font-bold mb-4 relative inline-block">
                            Coding Platforms
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-purple"></span>
                        </h3>
                        <div className="space-y-4">
                            {platforms.map((platform, index) => (
                                <a
                                    key={index}
                                    href={platform.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-dark p-4 rounded-lg border border-purple-500/20 flex items-center gap-4 hover:border-purple-500/40 transition-all duration-300 hover:translate-x-2 group"
                                >
                                    <div
                                        className={`${platform.color} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">
                                            {platform.name}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400">
                                                @{platform.username}
                                            </span>
                                            <span
                                                className={`${platform.color} text-sm`}
                                            >
                                                {platform.rating}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Code snippet and achievements */}
                    <div className="reveal" style={{ animationDelay: "0.3s" }}>
                        {/* Code snippet */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold mb-4 relative inline-block">
                                Sample Algorithm
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-cyan"></span>
                            </h3>
                            <div className="glass-dark p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 group overflow-hidden">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                        Kadane's Algorithm
                                    </span>
                                </div>
                                <pre className="text-sm text-gray-300 overflow-x-auto font-mono">
                                    <code>{codeSnippet}</code>
                                </pre>
                            </div>
                        </div>

                        {/* Achievements */}
                        <h3 className="text-xl font-bold mb-4 relative inline-block">
                            Key Achievements
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-pink"></span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className="glass-dark p-4 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {achievement.icon}
                                    </div>
                                    <h4 className="font-medium text-white mb-1">
                                        {achievement.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to action */}
                <div
                    className="text-center reveal"
                    style={{ animationDelay: "0.5s" }}
                >
                    <a
                        href="#projects"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 group"
                    >
                        <span>See How I Apply These Skills</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default CompetitiveProgramming
