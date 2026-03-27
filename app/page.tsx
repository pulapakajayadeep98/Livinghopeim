"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Ministries", href: "#ministries" },
  { label: "Services", href: "#services" },
  { label: "Sermons", href: "#sermons" },
  { label: "Gallery", href: "#gallery" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const headerOffset = 96;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.pushState(null, "", href);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/home1.png"
          alt="Hero background slide 1"
          fill
          priority
          sizes="100vw"
          className="hero-slide slide-1 object-cover"
        />
        <Image
          src="/home2.JPG"
          alt="Hero background slide 2"
          fill
          sizes="100vw"
          className="hero-slide slide-2 object-cover"
        />
        <Image
          src="/home3.png"
          alt="Hero background slide 3"
          fill
          sizes="100vw"
          className="hero-slide slide-3 object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a3a]/85 via-[#241246]/80 to-[#4b2a7a]/75" />
      <div className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-6xl flex-col px-6 pb-16 pt-8 text-white">
    <header className="absolute top-0 left-1/2 z-50 w-screen -translate-x-1/2">
  <div className="flex items-center justify-between px-8 py-4">

    {/* Logo - Properly aligned left top */}
    <div className="flex items-center">
      <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
              <Image
                src="/lh.png"
                alt="LHE International Ministries"
                width={48}
                height={48}
                sizes="48px"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="font-serif text-lg font-semibold bg-gradient-to-r from-[#f8d86b] via-[#7ee8fa] to-[#c6ffdd] bg-clip-text text-transparent">
                Living Hope Int. Evang
              </p>
           <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/60">
  Giving hope to the hopeless
</p>
            </div>
          </div>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-white/80">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(event) => handleNavClick(event, link.href)}
          className="transition-colors hover:text-[#f1d27a]"
        >
          {link.label}
        </a>
      ))}

      <a
        href="tel:9100067779"
        className="rounded-full bg-[#d4af37] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5"
      >
        Request Prayer
      </a>
    </nav>

    {/* Mobile Menu Button */}
    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      className="md:hidden rounded-full border border-white/40 p-2 text-white transition-colors hover:border-[#f1d27a] hover:text-[#f1d27a]"
      aria-label="Open navigation menu"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>

  </div>
</header>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 bg-[#0b1a3a]/95 backdrop-blur-sm md:hidden">
            <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
    <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
              <Image
                src="/lh.png"
                alt="LHE International Ministries"
                width={48}
                height={48}
                sizes="48px"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="font-serif text-lg font-semibold bg-gradient-to-r from-[#f8d86b] via-[#7ee8fa] to-[#c6ffdd] bg-clip-text text-transparent">
                Living Hope Int. Evangelism
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">
                Giving hope to the hopeless
              </p>
            </div>
          </div>
</div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/40 p-2 text-white transition-colors hover:border-[#f1d27a] hover:text-[#f1d27a]"
                aria-label="Close navigation menu"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="mt-12 flex flex-col gap-6 px-6 text-xl font-semibold uppercase tracking-widest text-white/90">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="transition-colors hover:text-[#f1d27a]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}

        <div className="mt-[52vh] max-w-3xl sm:mt-28 lg:mt-32">
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white/90">Welcome To</span>
            <span className="block bg-gradient-to-r from-[#f8d86b] via-[#7ee8fa] to-[#c6ffdd] bg-clip-text text-transparent drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]">
              LIVING HOPE Int. Evang
            </span>
          </h1>
          <p className="mt-4 text-lg text-white/85 sm:text-xl">
         Giving hope to the hopeless.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-transform hover:-translate-y-0.5"
            >
              Join Us This Sunday
            </a>
            <a
              href="#sermons"
              className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#f1d27a] hover:text-[#f1d27a]"
            >
              Watch Sermons
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}



function AboutSection() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              Welcome
            </p>
           <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
  About LIVING HOPE International Evangelism
</h2>

<p className="mt-5 text-lg leading-8 text-slate-600">
  LIVING HOPE International Evangelism is a Spirit-filled, Bible-based ministry committed to spreading the Gospel of Jesus Christ and building a strong community of believers. We exist to help people encounter God's presence, grow in faith through the Word, and live a transformed life through the power of the Holy Spirit.
</p>

<p className="mt-4 text-lg leading-8 text-slate-600">
  Our vision is to raise disciples who are rooted in Scripture, strong in prayer, and passionate about reaching others with God's love. Through worship, teaching, and practical ministry, we create a welcoming environment where individuals and families can discover hope, healing, peace, and purpose.
</p>

<p className="mt-4 text-lg leading-8 text-slate-600">
  We believe church is not just a place to attend - it is a family to belong to. Whether you are new to faith, searching for answers, or looking to grow deeper spiritually, you are welcome here. We are committed to training believers, equipping leaders, and serving communities with compassion, excellence, and integrity.
</p>

<p className="mt-4 text-lg font-medium text-[#0b1a3a]">
  Come as you are - and grow with us in Christ.
</p>

         
          </div>
        </Reveal>

        <Reveal className="lg:justify-self-end">
          <div className="relative overflow-hidden rounded-3xl shadow-[0_18px_40px_rgba(11,26,58,0.2)]">
            <Image
              src="/anil.png"
              alt="Congregation worshipping"
              width={520}
              height={640}
              className="h-full w-full object-cover"
            />
               <div className="mt-8 rounded-2xl border border-[#f1d27a]/50 bg-[#fff8e1] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4b2a7a]">
                Pastor
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold text-[#0b1a3a]">
                M.A. Paul
              </p>
              
            </div>
          </div>
        </Reveal>
      </div>

      
    </section>
    
  );
  
}

function MissionVisionTeamSection() {
  const teamMembers = [
        {
      name: "Jemimah Paul",
      role: "pastor",
      image: "/jemimah.png",
    },
       {
      name: "Salluri Prakash",
      role: "Singer",
      image: "/prakash.png",
    },
       {
      name: "Joshua",
      role: "Pastor",
      image: "/chaitanya.jpeg",
    },
    
    {
      name: " Prakash ",
      role: "Pastor",
      image: "/",
    },
 

 
    {
      name: "Bro.Sreedhar",
      role: "Team Member",
      image: "/sreedhar1.png",
    },
    {
      name: "Samson",
      role: "Evangelist",
      image: "/samson.png",
    },
    {
      name: "Jeremiah",
      role: "Evangelist",
      image: "/jeremiah.jpeg",
    },
        {
      name: "pradeep kumar",
      role: "Evangelist",
      image: "/pradeep.jpeg",
    },
  ];

  return (
    <section className="py-28 bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Mission & Vision ===== */}
       <div className="max-w-5xl mx-auto text-center">
  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
    Who We Are
  </p>

  <h2 className="mt-4 font-serif text-4xl font-semibold text-[#0b1a3a]">
    Our Mission & Vision
  </h2>

  <p className="mt-4 text-lg text-slate-600 leading-8">
    Clear purpose. Strong faith. Practical love in action.
  </p>

  {/* Cards */}
  <div className="mt-12 grid gap-8 md:grid-cols-2 text-left">
    {/* Mission */}
    <div className="rounded-3xl bg-white border border-[#d4af37]/25 shadow-[0_18px_45px_rgba(11,26,58,0.10)] p-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-[#fff3cc] flex items-center justify-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3l8 4.5-8 4.5L4 7.5 12 3Z"
              stroke="#d4af37"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M20 7.5v8L12 20l-8-4.5v-8"
              stroke="#0b1a3a"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#4b2a7a]">
            Mission Statement
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold text-[#0b1a3a]">
            Our Mission
          </h3>
        </div>
      </div>

      <ul className="mt-6 space-y-3 text-slate-600 leading-7">
        <li>- We seek to lead people to Jesus Christ</li>
        <li>- To bring them into God's family</li>
        <li>- To nurture them into mature Christians</li>
        <li>- To equip them for ministry in the Church</li>
        <li>- To get them involved in the worldwide mission</li>
        <li>- To glorify God's name at home and to the ends of the earth</li>
      </ul>
    </div>

    {/* Vision */}
    <div className="rounded-3xl bg-[#0b1a3a] text-white shadow-[0_18px_45px_rgba(11,26,58,0.18)] p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#241246]/70 to-[#0b1a3a]/90" />
      <div className="relative">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21s-7-4.4-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.6-7 11-7 11Z"
                stroke="#f1d27a"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f1d27a]">
              Vision
            </p>
            <h3 className="mt-1 font-serif text-2xl font-semibold">
              Our Vision
            </h3>
          </div>
        </div>

        <p className="mt-6 text-white/85 text-lg leading-8">
          To see Jesus in all the loveliness of His person and the perfection of
          His work - and to make Him known through the preaching of the gospel.
        </p>

        {/* Small scripture-style accent (optional) */}
        <div className="mt-8 rounded-2xl bg-white/10 border border-white/10 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Our Focus
          </p>
          <p className="mt-2 text-base text-white/85">
            Preaching - Discipleship - Church Ministry - Community Outreach
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* ===== Our Team ===== */}
        <div id="ministries" className="mt-20 text-center">
          <h3 className="font-serif text-3xl font-semibold text-[#0b1a3a]">
            Our Team
          </h3>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(11,26,58,0.12)] overflow-hidden transition-transform hover:-translate-y-2"
              >
                <div className="h-[300px] overflow-hidden sm:h-[260px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={520}
                    height={520}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className={`h-full w-full object-cover ${member.image === "/sreedhar1.png" ? "object-[center_18%] sm:object-[center_15%]" : "object-top sm:object-center"}`}
                  />
                </div>

                <div className="p-6">
                  <h4 className="font-serif text-xl font-semibold text-[#0b1a3a]">
                    {member.name}
                  </h4>
                  <p className="mt-2 text-sm uppercase tracking-wide text-[#4b2a7a]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
function MinistryActivitiesSection() {
  return (
   <section className="relative h-[70vh] flex items-center justify-center text-white">

  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/baptism.png"
      alt="Church Activities"
      fill
      sizes="100vw"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Content */}
  <div className="relative text-center px-6">
    <h1 className="text-4xl md:text-6xl font-serif font-semibold">
      Our Church Activities
    </h1>
    <p className="mt-4 text-lg md:text-xl text-white/90">
      Serving communities through faith, compassion, and action.
    </p>
  </div>


</section>

  );

  
}
function ChildrenMinistrySection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <Image
            src="/child.jpeg"
            alt="Children Ministry"
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        <div>
          <h2 className="text-3xl font-serif font-semibold text-[#0b1a3a]">
            Children's Development & Care
          </h2>

          <p className="mt-6 text-slate-600 text-lg leading-8">
            We are committed to nurturing children through educational support,
            spiritual guidance, mentoring, and practical care. Our programs provide
            a safe and encouraging environment where children can grow in confidence,
            develop strong values, and discover their God-given potential.
            <br /><br />
            Through learning assistance, character-building activities, and
            community support initiatives, we help shape responsible, faith-filled
            individuals prepared for a hopeful and purposeful future.
          </p>
        </div>

      </div>
    </section>
  );
}
<section className="py-24 bg-[#f8f6f2]">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">

    {/* LEFT SIDE */}
    <BibleTrainingSection />

    {/* RIGHT SIDE */}
    <StatementOfFaith />

  </div>
</section>
function BibleTrainingSection() {
  return (
    <div >
      <h2 className="text-4xl font-serif font-semibold text-[#0b1a3a]">
        Bible Training & Leadership Development
      </h2>

      <p className="mt-6 text-lg text-slate-600 leading-8">
        We are committed to equipping believers through structured biblical
        teaching, discipleship training, and leadership development programs.
        Our goal is to raise spiritually grounded individuals who serve with
        wisdom, integrity, and maturity.
      </p>

      <div className="mt-10 overflow-hidden rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        <Image
          src="/bibletraining.png"
          alt="Bible Training"
          width={1400}
          height={900}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-[420px] object-cover"
        />
      </div>

      <p className="mt-10 text-lg text-slate-600 leading-8">
        Through classroom sessions, mentoring, practical ministry exposure,
        and focused study of Scripture, we prepare men and women to impact
        their communities with the truth of God's Word.
        <br /><br />
        Our training emphasizes character formation, spiritual discipline,
        servant leadership, and a heart for outreach  building leaders who
        reflect Christ in both life and ministry.
      </p>
<p className="mt-8 text-lg text-slate-600 leading-8">
  We also provide hands-on ministry experience, encouraging students to
  actively participate in outreach programs, church services, and community
  initiatives. Through mentorship and prayer guidance, we help individuals
  discover their calling and grow confidently in their spiritual journey.
</p>
      <div className="mt-12 rounded-2xl bg-white p-8 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-[#f1d27a]/40 text-center">
        <p className="text-xl font-serif italic text-[#0b1a3a]">
         Go and make disciples of all nations.
        </p>
        <p className="mt-3 text-sm uppercase tracking-widest text-[#4b2a7a]">
          Matthew 28:19
        </p>
      </div>
    </div>
  );
}
function StatementOfFaith() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "The Bible",
      content:
        "The Bible is God's unique revelation to humanity. It is the inspired, infallible Word of God and the supreme and final authority on all matters upon which it teaches.",
    },
    {
      title: "The Godhead",
      content:
        "There is only one God, the Creator of heaven and earth, who co-exists eternally as three persons - the Father, the Son, and the Holy Spirit - each fully God, yet personally distinct.",
    },
    {
      title: "Jesus Christ",
      content:
        "Jesus Christ is the only begotten Son of the Father, conceived of the Holy Spirit and born of the Virgin Mary. He was crucified, buried, and raised from the dead. He ascended to heaven and now sits at the right hand of the Father as our Intercessor.",
    },
    {
      title: "Sin and Repentance",
      content:
        "All have sinned and fall short of the glory of God. Repentance is commanded by God for all and is necessary for the forgiveness of sins.",
    },
    {
      title: "Salvation",
      content:
        "Justification, regeneration, and the new birth are wrought by faith in the blood of Jesus Christ.",
    },
    {
      title: "Holiness",
      content:
        "Holiness is God's standard of living for His people.",
    },
    {
      title: "Baptism of the Holy Spirit",
      content:
        "The baptism with the Holy Spirit is an experience subsequent to salvation, given to believers who have been cleansed in heart.",
    },
    {
      title: "Speaking in Tongues",
      content:
        "Speaking with other tongues as the Spirit gives utterance is the initial evidence of the baptism of the Holy Spirit.",
    },
    {
      title: "Water Baptism",
      content:
        "Water baptism by immersion is commanded in Scripture. All who repent should be baptized in the name of the Father, the Son, and the Holy Spirit.",
    },
    {
      title: "Divine Healing",
      content:
        "Divine healing is provided for all through the atonement of Jesus Christ.",
    },
    {
      title: "The Lord's Supper and Washing of Feet",
      content:
        "The Lord's Supper and the washing of the saints' feet are ordinances to be observed by believers.",
    },
    {
      title: "The Second Coming of Christ",
      content:
        "Jesus Christ will return premillennially - first to resurrect the righteous dead and catch away the living saints to meet Him in the air, and second to reign on the earth for a thousand years.",
    },
    {
      title: "The Resurrection and Eternity",
      content:
        "There will be a bodily resurrection - eternal life for the righteous and eternal punishment for the wicked.",
    },
    {
      title: "Human Sexuality and Marriage",
      content:
        "There are only two genders - male and female - as defined in Scripture (Genesis 1:26-28; Matthew 19:4-5). Marriage is a sacred union between one man and one woman, exclusive to all others.",
    },
  ];

  return (
    <div className="lg:pl-12 mt-16 lg:mt-0">
      <h3 className="text-3xl font-serif font-semibold text-[#0b1a3a] mb-10">
        Our Statement Of Faith
      </h3>

      <div className="space-y-5">
  {items.map((item, index) => (
    <div
      key={index}
      className="rounded-2xl bg-white border border-[#d4af37]/30 shadow-[0_10px_25px_rgba(11,26,58,0.08)] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(11,26,58,0.15)]"
    >
      <button
        onClick={() =>
          setOpenIndex(openIndex === index ? null : index)
        }
        className="w-full flex justify-between items-center px-6 py-5 text-left"
      >
        <span className="text-[#0b1a3a] font-semibold">
          {item.title}
        </span>

        <span className="text-[#d4af37] text-2xl font-bold transition-transform duration-300">
          {openIndex === index ? "-" : "+"}
        </span>
      </button>

      <div
        className={`px-6 text-slate-600 text-sm leading-7 transition-all duration-500 ease-in-out ${
          openIndex === index
            ? "max-h-[1000px] pb-6 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        {item.content}
      </div>
    </div>
  ))}
</div>
    </div>
  );
}
function ReachingSocietySection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE IMAGES */}
        <div className="relative flex flex-col items-center gap-6 min-h-[520px] md:block lg:justify-start">

          {/* BACK IMAGE (Village / Outreach) */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,26,58,0.15)] md:absolute md:top-0 md:left-0 md:w-[70%]">
            <Image
              src="/outreach.jpeg"
              alt="Village Outreach"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-full object-cover"
            />
          </div>

          {/* FRONT IMAGE (Blanket Helping Image) */}
          <div className="relative mt-6 w-full rounded-3xl overflow-hidden border-8 border-white shadow-[0_25px_60px_rgba(11,26,58,0.25)] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[75%] md:z-10">
            <Image
              src="/floods.jpeg"
              alt="Relief Support"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 42vw"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="lg:pl-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
            Outreach Ministry
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0b1a3a]">
            Reaching Society
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We are committed to serving small villages and underserved
            communities with compassion and practical support.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            During floods and times of hardship, we visit affected areas
            to provide essential supplies and assist families in every
            possible way.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Alongside practical help, we share the message of faith and hope,
            uplifting lives and strengthening communities wherever God leads us.
          </p>

         <div id="donation" className="mt-8">
  <a
    href="#donate"
    className="inline-block bg-[#d4af37] text-[#0b1a3a] px-6 py-3 rounded-full font-semibold shadow-md hover:-translate-y-1 transition"
  >
    Support The Mission
  </a>
</div>
        </div>

      </div>
    </section>
  );
}
function TranslationMinistrySection() {
  return (
    <section className="py-28 bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE - 3 IMAGES */}
        <div className="grid grid-cols-2 gap-6">

          {/* Large Left Image */}
          <div className="col-span-2 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(11,26,58,0.15)]">
            <Image
              src="/gal1.png"
              alt="Conference Translation"
              width={1200}
              height={700}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Bottom Left */}
          <div className="rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(11,26,58,0.12)]">
            <Image
              src="/gal2.png"
              alt="Church Meeting"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 50vw, 22vw"
              className="w-full h-[220px] object-cover"
            />
          </div>

          {/* Bottom Right */}
          <div className="rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(11,26,58,0.12)]">
            <Image
              src="/trans3.jpeg"
              alt="Ministry Conference"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 50vw, 22vw"
              className="w-full h-[220px] object-cover"
            />
          </div>

        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="lg:pl-10">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
            Translation Ministry
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#0b1a3a]">
            Interpreting & Ministry Support
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Rev. M.A. Paul faithfully serves as a translator and ministry
            partner during international conferences and special meetings
            conducted across India.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whenever foreign speakers visit to share the Word of God,
            he assists by translating their messages into the local
            language, ensuring that every listener clearly understands
            and receives the message.
          </p>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Through accurate interpretation and spiritual sensitivity,
            he bridges cultural and language gaps - helping the Gospel
            reach hearts effectively and powerfully.
          </p>

        </div>

      </div>
    </section>
  );
}

function PastorProfilePosterSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-[0_22px_55px_rgba(11,26,58,0.18)]">
            <Image
              src="/lh1.jpeg"
              alt="M.A. Paul ministry portrait"
              width={900}
              height={1100}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-[460px] w-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-white shadow-[0_16px_30px_rgba(11,26,58,0.2)] sm:block">
            <Image
              src="/lh2.jpeg"
              alt="M.A. Paul during ministry"
              width={400}
              height={500}
              sizes="176px"
              className="h-56 w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-[#d4af37]/30 bg-[#f8f6f2] p-10 shadow-[0_20px_45px_rgba(11,26,58,0.1)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
            Spiritual Mentor
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-[#0b1a3a]">Dr.Rev.Richard </h2>
          <p className="mt-4 text-2xl leading-9 text-[#1f3f74]">
            Senior Pastor
          </p>
         

          <p className="mt-8 text-lg leading-8 text-slate-600">
            Rev. M.A. Paul is a faith-filled leader and teacher who has
            dedicated his life to preaching the Gospel, guiding believers, and
            equipping the church with biblical truth and practical ministry.
          </p>
        </div>
      </div>
    </section>
  );
}

function PrayerSupportSection() {
  return (
  <section className="relative py-20 text-white">

  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/prayer.png"
      alt="Prayer support background"
      fill
      sizes="100vw"
      className="object-cover"
    />
  </div>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#241246]/90 to-[#0b1a3a]/90"></div>

  {/* Content */}
  <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f8d86b]">
      Prayer Support
    </p>

    <h2 className="mt-4 font-serif text-3xl font-semibold sm:text-4xl">
      24X7 Online Prayer Available
    </h2>

    <p className="mt-6 text-lg text-white/85">
      No matter where you are or what you are going through, our prayer team
      is available to stand with you in faith. We believe in the power of
      prayer and God's ability to heal, restore, and provide breakthrough.
    </p>

    <div className="mt-8">
      <a
        href="tel:+919100067779"
        className="rounded-full bg-[#d4af37] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-transform hover:-translate-y-1"
      >
        Request Prayer Now
      </a>
    </div>
  </div>

</section>
  );
}

function ServicesSection() {
  const services = [
    {
      title: "Sunday Service",
      time: "9:30 AM - 12:00 PM",
      description: "Celebrate worship and the Word together as a church family.",
    },
    {
      title: "Wednesday Bible Study",
      time: "6:30 PM - 8:30 PM",
      description: "Midweek teaching for deeper spiritual growth and fellowship.",
    },
    {
      title: "Friday Fasting Prayer",
      time: "6:30 PM - 8:30 PM",
      description: "Dedicated prayer and fasting for renewal and breakthrough.",
    },
  ];

  return (
    <section id="sermons" className="bg-[#f8f5ff] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              Service Times
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
              Join Our Weekly Gatherings
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Reveal key={service.title}>
              <div className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_15px_35px_rgba(11,26,58,0.12)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff3cc]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5v14M7 9h10"
                      stroke="#d4af37"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#0b1a3a]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#4b2a7a]">
                    {service.time}
                  </p>
                  <p className="mt-3 text-base text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function TestimonialSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="rounded-3xl bg-gradient-to-br from-[#241246] to-[#0b1a3a] text-white shadow-[0_25px_60px_rgba(11,26,58,0.25)] p-12 relative overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z"
                  stroke="#f1d27a"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#f1d27a]">
                Testimonial
              </p>
              <h2 className="font-serif text-3xl font-semibold">
                A Divine Encounter
              </h2>
            </div>
          </div>

          {/* Content */}
          <p className="text-white/90 text-lg leading-8">
            In the year 2013, my life completely changed through a divine encounter
            with God. At a moment when I was ready to end my life, I suddenly heard
            the voice of the Lord saying, Do not die. Give Me two minutes  I will
            change your entire life.
          </p>

          <p className="mt-6 text-white/85 text-lg leading-8">
            Jesus led me to meet a pastor who prayed for me. During that prayer,
            I experienced a powerful vision of a bright and glorious presence.
            With tears flowing, I surrendered my life completely to Christ and
            promised never to return to despair again.
          </p>

          <p className="mt-6 text-white/85 text-lg leading-8">
            That precious moment confirmed the call of Christ upon my life.
            At the age of 26, I committed myself fully to serve the Lord and
            dedicate my life to His mighty work.
          </p>

          {/* Footer */}
          <div className="mt-10 border-t border-white/20 pt-6">
            <p className="text-xl font-semibold text-[#f1d27a]">
              M.A. Paul
            </p>
            <p className="text-white/70 uppercase tracking-widest text-sm">
              Pastor
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
function PremiumGallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/galary1.jpeg",
    "/galary2.png",
   
    "/galary4.jpeg",
    "/galary5.jpeg",
    "/galary6.jpeg",
     "/galary3.jpeg",
  ];

  return (
    <section id="gallery" className="bg-[#f9f7ff] py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
          Gallery
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
          Moments Of Faith & Fellowship
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
          Celebrating worship, prayer, training, and community life through
          powerful moments captured in ministry.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="group relative mb-6 cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt="Gallery"
                width={1000}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/40"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Preview"
            width={1600}
            height={1200}
            sizes="95vw"
            className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

function DonationSection() {
  return (
    <section id="donate" className="py-28 bg-[#f8f6f2]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
            Support The Ministry
          </p>

          <h2 className="mt-4 font-serif text-4xl font-semibold text-[#0b1a3a]">
            Make a Donation
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-8">
            Your generous support helps us continue outreach programs,
            relief work, discipleship training, and ministry activities.
            Every contribution makes a meaningful impact.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#241246] to-[#0b1a3a] text-white p-12 shadow-[0_25px_60px_rgba(11,26,58,0.25)]">

          {/* Trust Name */}
          <h3 className="text-2xl font-serif font-semibold text-[#f1d27a] text-center">
            Emmanuel Grace Public Charitable Trust
          </h3>

          <div className="mt-10 grid md:grid-cols-2 gap-12">

            {/* Bank Details */}
            <div>
              <h4 className="uppercase tracking-widest text-sm text-[#f1d27a] mb-6">
                Bank Transfer Details
              </h4>

              <div className="space-y-4 text-white/90 leading-7">
                <p><span className="font-semibold">Bank:</span> Axis Bank</p>
                <p><span className="font-semibold">Account Number:</span> 924010027158690</p>
                <p><span className="font-semibold">IFSC Code:</span> UTIB0001413</p>
                <p><span className="font-semibold">Branch:</span> Eluru Road, Governorpet, Vijayawada</p>
              </div>
            </div>

            {/* UPI Details */}
            <div>
              <h4 className="uppercase tracking-widest text-sm text-[#f1d27a] mb-6">
                UPI Transfer
              </h4>

              <div className="space-y-4 text-white/90 leading-7">
                <p>
                  <span className="font-semibold">UPI ID:</span> anilpaul7@ybl
                </p>

             <div className="rounded-2xl bg-white p-4 shadow-lg w-[180px]">
    <Image
      src="/qr.jpeg"   // <-- place your QR image in public folder
      alt="Donation QR Code"
      width={220}
      height={220}
      sizes="180px"
      className="w-full h-auto object-contain"
    />
  </div>

                <div className="mt-6 p-5 rounded-2xl bg-white/10 border border-white/20 text-sm text-white/80">
                  For confirmation and receipt, kindly share your
                  transaction details to:
                  <br />
                  <span className="font-semibold text-[#f1d27a]">
                    lhievangelism@gmail.com
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Security Note */}
          <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/70">
            Please verify the Trust name before making any transfer.
            Emmanuel Grace Public Charitable Trust will never request
            donations through personal accounts.
          </div>

        </div>

      </div>
    </section>
  );
}
function SermonSection() {
  const videos = [
    {
      src: "https://www.youtube.com/embed/0luNe3LkZlg",
      title: "?????? ???????? ?????????",
    },
    {
      src: "https://www.youtube.com/embed/G83kJw6auaI",
      title: "?? ??????????? ??????????? ?????? ?????????",
    },
    {
      src: "https://www.youtube.com/embed/WL98mRSNj-o",
      title: "???????? ?????? ???? ???? ???????????",
    },
  ];

  return (
    <section  className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              Media
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
              Watch Our Sermons
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {videos.map((video) => (
            <Reveal key={video.src}>
              <div className="overflow-hidden rounded-2xl shadow-[0_15px_35px_rgba(11,26,58,0.12)]">
                <iframe
                  className="aspect-video w-full"
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-[#0b1a3a] py-20 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f1d27a]">
              Contact
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              We Would Love To Hear From You
            </h2>
            <div className="mt-8 space-y-6 text-lg text-white/85">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                  Phone
                </p>
                <p className="mt-1">9100067779</p>
                <p>9948818009</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                  Email
                </p>
                <p className="mt-1">livinghopemission@outlook.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                  Address
                </p>
                <p className="mt-1">
                  Beside Indian Dental Hospital,
                  <br />
                  4th Line, Kedaraswaraopet,
                  <br />
                  Vijayawada - 520003
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
            <iframe
              title="L H E International Ministries Location"
              src="https://www.google.com/maps?q=16.525415923185296,80.62636983480407&z=16&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#081329] text-white">
      {/* Top accent line */}
      <div className="h-1 w-full bg-[#d4af37]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        {/* TOP BAR */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
              <Image
                src="/lh.png"
                alt="LHE International Ministries"
                width={48}
                height={48}
                sizes="48px"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div>
              <p className="font-serif text-lg font-semibold bg-gradient-to-r from-[#f8d86b] via-[#7ee8fa] to-[#c6ffdd] bg-clip-text text-transparent">
                Living Hope International Evangelism
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">
                Giving hope to the hopeless
              </p>
            </div>
          </div>

          {/* Middle: Phone + Email */}
          <div className="flex flex-col gap-3 md:items-center">
            <a
              href="tel:+919100067779"
              className="flex items-center gap-3 text-sm text-white/85 hover:text-[#f1d27a] transition"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                {/* phone icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.5 3.75h2.2c.6 0 1.1.4 1.2 1l.5 3c.1.6-.2 1.2-.8 1.4l-1.5.6c.8 1.6 2.2 3 3.8 3.8l.6-1.5c.2-.6.8-.9 1.4-.8l3 .5c.6.1 1 .6 1 1.2v2.2c0 .7-.6 1.3-1.3 1.2C11 20.8 3.2 13 3.3 5.1c0-.7.6-1.3 1.2-1.3z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="font-medium">+91 91000 67779</span>
            </a>

            <a
              href="mailto:info@mapaulministries.org"
              className="flex items-center gap-3 text-sm text-white/85 hover:text-[#f1d27a] transition"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                {/* mail icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6.5 7.5 12 12l5.5-4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="font-medium">livinghopemission@outlook.com</span>
            </a>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3 md:justify-end">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-[#f1d27a] hover:ring-[#d4af37]/40 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 8.5V7.2c0-.7.5-1.2 1.2-1.2H17V3h-2.4C12.6 3 11 4.6 11 6.6V8.5H9v3h2V21h3v-9.5h2.7l.3-3H14Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/pastormapaul?igsh=MWdxZ2Vlaml1bzRt"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-[#f1d27a] hover:ring-[#d4af37]/40 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M17.2 6.8h.01"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-[#f1d27a] hover:ring-[#d4af37]/40 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h4.8l5.2 7.2L19.4 4H22l-6.8 9.3L22 20h-4.8l-5.6-7.6L6 20H4l7.2-9.7L4 4Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919100067779"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:text-[#f1d27a] hover:ring-[#d4af37]/40 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.6 8.9c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.8 1.9c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .4.6 1.1 1.5 2 2.6 2.6.1.1.3.1.4 0l.6-.5c.2-.2.4-.2.6-.1l1.9.8c.3.1.4.3.4.5v.6c0 .3 0 .5-.4.7-.5.3-1.5.6-3.1 0-2.2-.8-4.6-3.1-5.4-5.4-.6-1.6-.3-2.6 0-3.1Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
            <a href="#terms" className="hover:text-[#f1d27a] transition">
              Terms & Conditions
            </a>
            <a href="#privacy" className="hover:text-[#f1d27a] transition">
              Privacy Policy
            </a>
          </div>
<div className="flex items-center gap-4 md:justify-end">
  
  {/* Logo ? Opens Website */}
  <a
    href="https://www.pandjtechnologies.com"
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 flex items-center justify-center hover:ring-[#d4af37]/50 transition"
  >
    <Image
      src="/logo.png"
      alt="P & J Technologies"
      width={40}
      height={40}
      sizes="40px"
      className="h-full w-full object-contain p-1"
    />
  </a>

  {/* Text ? Click to Call */}
  <p className="text-sm text-white/70">
    Designed & Developed by{" "}
    <a
      href="tel:+919182059570"
      className="font-semibold text-[#f1d27a] hover:text-[#d4af37] transition"
    >
     &nbsp; P & J Technologies
    </a>
  </p>

</div>
          {/* Center: Copyright */}
          <p className="text-sm text-white/70 md:text-center">
            2026 L H E International Ministries. All rights reserved.
          </p>

          {/* Right: Designed & Developed */}
         
        </div>
      </div>
    </footer>
  );
}

function FloatingPrayerCallButton() {
  return (
    <a
      href="tel:9100067779"
      aria-label="Request Online Prayer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-[#d4af37] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-[0_14px_30px_rgba(212,175,55,0.45)] transition-transform hover:-translate-y-0.5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1a3a] text-[#f1d27a]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 3.75h2.2c.6 0 1.1.4 1.2 1l.5 3c.1.6-.2 1.2-.8 1.4l-1.5.6c.8 1.6 2.2 3 3.8 3.8l.6-1.5c.2-.6.8-.9 1.4-.8l3 .5c.6.1 1 .6 1 1.2v2.2c0 .7-.6 1.3-1.3 1.2C11 20.8 3.2 13 3.3 5.1c0-.7.6-1.3 1.2-1.3z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="hidden sm:inline">Request Online Prayer</span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <AboutSection />
      <MissionVisionTeamSection />
      <MinistryActivitiesSection />
      <ChildrenMinistrySection />

      {/* Bible Training + Faith */}
      <section className="py-24 bg-[#f8f6f2]">
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-stretch">
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-[#d4af37]/30"></div>
          <BibleTrainingSection />
          <StatementOfFaith />
        </div>
      </section>

      {/* ? ADD HERE */}
      <ReachingSocietySection />
<TranslationMinistrySection />
      <PastorProfilePosterSection />

      <PrayerSupportSection />
      <ServicesSection />
      <TestimonialSection />
      <PremiumGallerySection />
<DonationSection />
      <SermonSection />
      <ContactSection />
      <Footer />
      <FloatingPrayerCallButton />
    </main>
  );
}
