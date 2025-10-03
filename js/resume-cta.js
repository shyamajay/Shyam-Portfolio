class ResumeComponent {
  constructor() {
    this.DRIVE_PREVIEW_URL =
      "https://drive.google.com/file/d/XXXXXXXXXXXX/view?usp=sharing";
    this.DRIVE_DOWNLOAD_URL =
      "https://drive.google.com/uc?export=download&id=XXXXXXXXXXXX";
    this.LOCAL_RESUME_URL = "resume/Resume.pdf";

    this.dropdown = document.querySelector(".resume-dropdown");
    this.dropdownToggle = document.querySelector(".resume-dropdown-toggle");
    this.metaElement = document.querySelector(".resume-meta");

    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.prefetchDrive();
    await this.updateMetadata();
  }

  setupEventListeners() {
    // Toggle dropdown
    this.dropdownToggle?.addEventListener("click", (e) => {
      e.preventDefault();
      this.dropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.dropdown.classList.remove("active");
      }
    });

    // Handle keyboard navigation
    this.dropdown?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.dropdown.classList.remove("active");
        this.dropdownToggle.focus();
      }
    });

    // Track downloads
    document.querySelectorAll("[data-resume-action]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const action = e.currentTarget.dataset.resumeAction;
        this.trackDownload(action);
      });
    });
  }

  prefetchDrive() {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = this.DRIVE_PREVIEW_URL;
    document.head.appendChild(link);
  }

  async updateMetadata() {
    try {
      const metadata = await this.fetchMetadata();
      if (metadata && this.metaElement) {
        const { date, size } = metadata;
        this.metaElement.textContent = `Last updated ${date} · ${size}`;
      }
    } catch (error) {
      console.warn("Failed to fetch resume metadata:", error);
    }
  }

  async fetchMetadata() {
    try {
      const response = await fetch(this.DRIVE_DOWNLOAD_URL, { method: "HEAD" });
      if (response.ok) {
        return {
          date: this.formatDate(
            new Date(response.headers.get("Last-Modified"))
          ),
          size: this.formatSize(
            parseInt(response.headers.get("Content-Length"))
          ),
        };
      }
    } catch (error) {
      console.warn("Failed to fetch Drive metadata, trying local file...");
    }

    try {
      const response = await fetch(this.LOCAL_RESUME_URL, { method: "HEAD" });
      if (response.ok) {
        return {
          date: this.formatDate(
            new Date(response.headers.get("Last-Modified"))
          ),
          size: this.formatSize(
            parseInt(response.headers.get("Content-Length"))
          ),
        };
      }
    } catch (error) {
      console.error("Failed to fetch local file metadata:", error);
    }

    return null;
  }

  formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  trackDownload(action) {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "resume_download",
        source: "hero",
        action: action,
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ResumeComponent();
});
