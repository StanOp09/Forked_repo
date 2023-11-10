function SocialShare() {
  const subject = "Check out this website!";
  const shareURL = "https://www.replaceourwebsitenamehereoncewemakeit.com";
  const shareText =
    "Transform Your Writing with Our AI Article Writing & Social Media Content Assistant | Boost Productivity and Quality | Get AI-Written Articles and Social Media Content Generation | Try It Today!";

  // Function to handle the share logic
  const handleShare = async (platform) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareURL
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareURL)}`;
        break;
      case "pinterest-share":
        url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          shareURL
        )}`;
        break;
      case "tumblr-share":
        url = `https://www.tumblr.com/share/link?url=${encodeURIComponent(
          shareURL
        )}&name=${encodeURIComponent(shareText)}`;
        break;
      case "telegram-share":
        url = `https://t.me/share/url?url=${encodeURIComponent(
          shareURL
        )}&text=${encodeURIComponent(shareText)}`;
        break;
      case "email-share":
        url = `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp-share":
        url = `whatsapp://send?text=${encodeURIComponent(
          shareText + " " + shareURL
        )}`;
        break;
      default:
        console.error("Unsupported platform for sharing:", platform);
        return;
    }

    try {
      const shareWindow = window.open(url, "Share", "width=600,height=400");
      if (!shareWindow) {
        throw new Error(
          "Failed to open share window. It might have been blocked by a pop-up blocker."
        );
      }
    } catch (error) {
      console.error("Error during share:", error.message);
      alert(
        "An error occurred while trying to share. Please check your pop-up settings and try again."
      );
    }
  };
}

return (
  <div>
    {/* Facebook Share Button */}
    <button
      onClick={() => handleShare("facebook")}
      aria-label="Share on Facebook"
      aria-haspopup="true"
    >
      <ion-icon name="logo-facebook"></ion-icon>
    </button>

    {/* Twitter Share Button */}
    <button
      onClick={() => handleShare("twitter")}
      aria-label="Share on Twitter"
      aria-haspopup="true"
    >
      <ion-icon name="logo-twitter"></ion-icon>
    </button>

    {/* Pinterest Share Button */}
    <button
      onClick={() => handleShare("pinterest-share")}
      aria-label="Share on Pinterest"
      aria-haspopup="true"
    >
      <ion-icon name="logo-pinterest"></ion-icon>
    </button>

    {/* Tumblr Share Button */}
    <button
      onClick={() => handleShare("tumblr-share")}
      aria-label="Share on Tumblr"
      aria-haspopup="true"
    >
      <ion-icon name="logo-tumblr"></ion-icon>
    </button>

    {/* Telegram Share Button */}
    <button
      onClick={() => handleShare("telegram-share")}
      aria-label="Share via Telegram"
      aria-haspopup="true"
    >
      <ion-icon name="paper-plane"></ion-icon>
    </button>

    {/* Email Share Button */}
    <button
      onClick={() => handleShare("email-share")}
      aria-label="Share via Email"
      aria-haspopup="true"
    >
      <ion-icon name="mail"></ion-icon>
    </button>

    {/* WhatsApp Share Button */}
    <button
      onClick={() => handleShare("whatsapp-share")}
      aria-label="Share on WhatsApp"
      aria-haspopup="true"
    >
      <ion-icon name="logo-whatsapp"></ion-icon>
    </button>
  </div>
);

export default SocialShare;
