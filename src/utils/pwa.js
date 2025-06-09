// PWA installation and service worker registration
export const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// PWA install prompt
let deferredPrompt;

export const initPWAInstall = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallButton();
  });
};

const showInstallButton = () => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'block';
    installButton.addEventListener('click', installPWA);
  }
};

const hideInstallButton = () => {
  const installButton = document.getElementById('pwa-install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
};

const installPWA = async () => {
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the deferredPrompt
    deferredPrompt = null;
    hideInstallButton();
  }
};

// Check if app is running as PWA
export const isPWA = () => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
};

// Network status detection
export const initNetworkStatus = () => {
  const updateNetworkStatus = () => {
    const isOnline = navigator.onLine;
    const statusElement = document.getElementById('network-status');
    
    if (statusElement) {
      if (isOnline) {
        statusElement.textContent = '';
        statusElement.className = 'hidden';
      } else {
        statusElement.textContent = 'You are offline. Some features may be limited.';
        statusElement.className = 'network-offline-banner';
      }
    }
  };

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  updateNetworkStatus(); // Initial check
};

// Mobile-specific optimizations
export const initMobileOptimizations = () => {
  // Prevent zoom on input focus for iOS
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const viewport = document.querySelector('meta[name=viewport]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
  }

  // Add touch class for touch devices
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }

  // Optimize scroll performance
  let ticking = false;
  const updateScrollPosition = () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
      if (scrolled > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
};

// Performance monitoring
export const initPerformanceMonitoring = () => {
  // Monitor loading performance
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
  });
};

// Initialize all PWA features
export const initPWA = () => {
  registerSW();
  initPWAInstall();
  initNetworkStatus();
  initMobileOptimizations();
  initPerformanceMonitoring();
};

