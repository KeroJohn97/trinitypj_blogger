import React from "react"

// 定义网站结构中的 L2 导航项类型
interface NavItem {
  name: string
  href: string
  isButton?: boolean
  isPrimaryCTA?: boolean
}

// 定义用于快速入口卡片的类型
interface QuickLink {
  title: string
  description: string
  href: string
  icon: string // 模拟图标
}

// 模拟 L2 导航数据 (基于方案一：现代居中型)
const mainNavItems: NavItem[] = [
  { name: "About Us", href: "/about" },
  { name: "Ministries & Groups", href: "/ministries" },
  { name: "News & Events", href: "/news" },
  { name: "Contact Us", href: "/contact", isButton: true },
  { name: "Give / Support", href: "/give", isButton: true, isPrimaryCTA: true },
]

// 模拟快速入口卡片数据
const quickLinks: QuickLink[] = [
  { title: "Ministries & Groups", description: "加入一个小组，建立联系。", href: "/ministries", icon: "👥" },
  { title: "News & Events", description: "查看最新活动和社区新闻。", href: "/news", icon: "🗓️" },
  { title: "For Seekers / New Here", description: "如果你是第一次来，了解如何开始。", href: "/seekers", icon: "❓" },
]

const HomePagePreview: React.FC = () => {
  // 模拟动态状态：非聚会时段 (优先级 #3)
  const heroStatus = "default"
  const heroData = {
    title: "在这里找到你的社区。",
    subtitle: "每周日聚会，致力于服务本社区。",
    ctaText: "🎉 计划你的初次到访",
    ctaLink: "/seekers",
  }

  // --- 样式定义 (仅用于结构演示) ---
  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 5%",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    logo: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      color: "#333",
    },
    navMenu: {
      display: "flex",
      gap: "20px",
    },
    navItem: {
      textDecoration: "none",
      color: "#555",
      padding: "0.5rem 0",
    },
    ctaButton: {
      padding: "0.7rem 1.2rem",
      borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "bold",
      marginLeft: "10px",
    },
    primaryCta: {
      backgroundColor: "#FF6347", // 强调色
      color: "#fff",
    },
    secondaryCta: {
      backgroundColor: "transparent",
      border: "1px solid #FF6347",
      color: "#FF6347",
    },
    heroSection: {
      backgroundColor: "#f5f5f5",
      textAlign: "center",
      padding: "10rem 5% 6rem 5%",
      backgroundImage: 'url("https://via.placeholder.com/1920x600?text=Hero+Image+of+Community")',
      backgroundSize: "cover",
      color: "#fff",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
    },
    heroTitle: {
      fontSize: "3rem",
      marginBottom: "1rem",
    },
    heroSubtitle: {
      fontSize: "1.5rem",
      marginBottom: "2rem",
    },
    quickLinksSection: {
      padding: "4rem 5%",
      textAlign: "center",
      backgroundColor: "#fff",
    },
    quickLinksGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "2rem",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "2rem",
      textAlign: "center",
      transition: "transform 0.2s",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
    },
    cardIcon: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    footer: {
      backgroundColor: "#333",
      color: "#ccc",
      padding: "3rem 5%",
      fontSize: "0.9rem",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "30px",
    },
    footerHeading: {
      color: "#fff",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
  }
  // --- END 样式定义 ---

  const NavButtons = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {mainNavItems.map((item) => {
        if (item.isButton) {
          const style = item.isPrimaryCTA
            ? { ...styles.ctaButton, ...styles.primaryCta }
            : { ...styles.ctaButton, ...styles.secondaryCta }
          return (
            <a key={item.name} href={item.href} style={style}>
              {item.name}
            </a>
          )
        }
        return null
      })}
    </div>
  )

  const NavLinks = () => (
    <div style={styles.navMenu}>
      {mainNavItems.map((item) => {
        if (!item.isButton) {
          return (
            <a key={item.name} href={item.href} style={styles.navItem}>
              {item.name}
            </a>
          )
        }
        return null
      })}
    </div>
  )

  return (
    <div>
      {/* 1. HEADER (顶部区) - 现代居中型 */}
      <header style={styles.header}>
        <a href="/" style={styles.logo}>
          [Logo] 组织名称
        </a>
        <NavLinks />
        <NavButtons />
      </header>

      {/* 1. HERO SECTION (主视觉区) - 动态内容 */}
      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>{heroData.title}</h1>
        <p style={styles.heroSubtitle}>{heroData.subtitle}</p>
        <a
          href={heroData.ctaLink}
          style={{ ...styles.ctaButton, ...styles.primaryCta, fontSize: "1.2rem", padding: "1rem 2rem" }}
        >
          {heroData.ctaText}
        </a>
      </section>

      {/* 2. 快速入口卡片区 */}
      <section style={styles.quickLinksSection}>
        <h2>探索我们 | Find Your Place</h2>
        <div style={styles.quickLinksGrid}>
          {quickLinks.map((link) => (
            <a key={link.title} href={link.href} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={styles.card}>
                <div style={styles.cardIcon}>{link.icon}</div>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 2. 简化的活动与位置区 */}
      <section style={{ padding: "4rem 5%", display: "flex", gap: "40px", backgroundColor: "#f9f9f9" }}>
        <div style={{ flex: 1 }}>
          <h2>🗓️ 即将到来的活动</h2>
          <p>查看最新活动：[活动A] - 12月1日，[活动B] - 12月8日</p>
          <a href="/news" style={{ ...styles.ctaButton, ...styles.secondaryCta }}>
            查看所有活动
          </a>
        </div>
        <div style={{ flex: 1 }}>
          <h2>📍 聚会时间与位置</h2>
          <p>每周日 上午 10:00</p>
          <p>地址：[组织地址]</p>
          <a href="/contact" style={{ ...styles.ctaButton, ...styles.secondaryCta }}>
            获取路线
          </a>
          <div
            style={{
              height: "150px",
              backgroundColor: "#eee",
              marginTop: "10px",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            [地图嵌入区]
          </div>
        </div>
      </section>

      {/* 3. FOOTER (页脚) */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          {/* 列 1: 联系与位置 */}
          <div>
            <h4 style={styles.footerHeading}>[Logo] 组织名称</h4>
            <p>在这里找到你的社区，连接生活。</p>
            <p>地址 | 电话 | 邮箱</p>
          </div>
          {/* 列 2: 主导航 */}
          <div>
            <h4 style={styles.footerHeading}>快速链接</h4>
            {mainNavItems
              .filter((item) => !item.isButton)
              .map((item) => (
                <p key={item.name}>
                  <a href={item.href} style={{ color: "#ccc", textDecoration: "none" }}>
                    {item.name}
                  </a>
                </p>
              ))}
          </div>
          {/* 列 3: 次要链接 */}
          <div>
            <h4 style={styles.footerHeading}>支持与法律</h4>
            <p>
              <a href="/privacy" style={{ color: "#ccc", textDecoration: "none" }}>
                隐私政策
              </a>
            </p>
            <p>
              <a href="/terms" style={{ color: "#ccc", textDecoration: "none" }}>
                使用条款
              </a>
            </p>
            <p>
              <a href="/faq" style={{ color: "#ccc", textDecoration: "none" }}>
                FAQ
              </a>
            </p>
          </div>
          {/* 列 4: CTA & 社交媒体 */}
          <div>
            <h4 style={styles.footerHeading}>连接我们</h4>
            <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>[社交图标]</div>
            <a href="/signup" style={{ ...styles.ctaButton, ...styles.primaryCta }}>
              Get Involved / Signup
            </a>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem", borderTop: "1px solid #555", paddingTop: "1rem" }}>
          © 2025 组织名称. All Rights Reserved.
        </div>
      </footer>
    </div>
  )
}

export default HomePagePreview
