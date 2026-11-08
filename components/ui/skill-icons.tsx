import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

export function FigmaLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Figma logo">
      <path
        d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
        fill="#0ACF83"
      />
      <path
        d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
        fill="#A259FF"
      />
    </svg>
  )
}

export function IllustratorLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Adobe Illustrator logo">
      <rect width="128" height="128" rx="26" fill="#330000" />
      <rect
        x="2.5"
        y="2.5"
        width="123"
        height="123"
        rx="23.5"
        fill="none"
        stroke="#FF9A00"
        strokeWidth="5"
        strokeOpacity="0.45"
      />
      <path
        fill="#FF9A00"
        d="M61.9 76.3H42l-4 12.5c-.1.5-.5.8-1 .7H27c-.6 0-.7-.3-.6-1l17.2-49.4c.2-.5.3-1.1.5-1.8.2-1.1.3-2.3.3-3.5-.1-.3.2-.5.4-.6h13.8c.4 0 .6.2.7.4l19.5 54.9c.2.6 0 .9-.5.9H67.1c-.4.1-.7-.2-.9-.6zM45.1 65.4h13.5c-.3-1.1-.7-2.5-1.2-3.8-.5-1.4-1-3-1.4-4.6-.5-1.7-1-3.3-1.5-4.9-.5-1.7-1-3.2-1.4-4.7-.4-1.5-.8-2.9-1.2-4.2h-.1c-.5 2.3-1.1 4.6-1.8 6.9-.8 2.6-1.6 5.2-2.5 7.9-.8 2.7-1.6 5.2-2.4 7.4m45.6-22.7c-1.8.1-3.5-.6-4.7-1.9-1.2-1.3-1.9-3.1-1.8-4.9-.1-1.8.6-3.5 1.9-4.7 1.3-1.2 3-1.9 4.7-1.9 2.1 0 3.7.6 4.9 1.9 1.2 1.3 1.8 3 1.8 4.7.1 1.8-.6 3.6-1.9 4.9-1.3 1.3-3.1 2-4.9 1.9m-6 46.3V47.9c0-.5.2-.7.7-.7H96c.5 0 .7.3.7.7V89c0 .6-.2.9-.7.9H85.5c-.5-.1-.8-.4-.8-.9"
      />
    </svg>
  )
}

export function CorelDrawLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="CorelDRAW logo">
      <defs>
        <linearGradient id="coreldraw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="45%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <path
        fill="url(#coreldraw-grad)"
        d="M10.651 0C10.265.019 9.4.272 8.584.657c-.816.39-3.696 2.161-3.752 6.536.072 4.145 3.847 11.191 6.397 13.455 0 0-4.141-6.952-4.439-13.013C6.488 1.575 10.651 0 10.651 0Zm2.679 0s4.159 1.575 3.861 7.635c-.299 6.061-4.439 13.013-4.439 13.013 2.547-2.264 6.324-9.31 6.396-13.455-.057-4.375-2.936-6.146-3.752-6.536C14.58.272 13.715.019 13.33 0Zm-1.38.019a1.088 1.088 0 0 0-.555.144C9.864.99 8.909 3.982 9.177 8.66c.185 3.242 1.009 7.291 2.422 11.988h.7c1.413-4.697 2.24-8.742 2.425-11.984.268-4.677-.688-7.674-2.219-8.501a1.088 1.088 0 0 0-.555-.144ZM7.017 1.066S2.543 2.909 3.431 8.225c.884 5.32 5.588 10.995 6.986 12.2.503.457-5.777-6.548-6.386-12.699-.291-2.323.39-4.9 2.986-6.66Zm9.966 0c2.595 1.76 3.276 4.337 2.985 6.66-.608 6.151-6.888 13.156-6.386 12.699 1.398-1.205 6.103-6.88 6.987-12.2.888-5.316-3.586-7.159-3.586-7.159Zm-6.815 20.78L10.647 24h2.599l.488-2.154h-3.566Z"
      />
    </svg>
  )
}

export function CanvaLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Canva logo">
      <defs>
        <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="65%" stopColor="#00A2C7" />
          <stop offset="100%" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11.5" fill="url(#canva-grad)" />
      <path
        fill="#FFFFFF"
        d="M6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"
      />
    </svg>
  )
}

export function HtmlCssLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="HTML5 and CSS3 logo">
      <path fill="#E44D26" d="M19.1 114.7L9.8 10.7h108.4l-9.3 104-44.9 12.6-44.9-12.6z"/>
      <path fill="#F16529" d="M64 118.8l37.1-10.4 7.9-88.7H64v99.1z"/>
      <path fill="#EBEBEB" d="M64 51.5H46.6l-1.2-13.6H64V24.5H31.7l3.6 40.4H64v-13.4zm0 37.1l-18.7-5-1.2-13.6H30.6l2.4 27 31 8.6v-17z"/>
      <path fill="#FFFFFF" d="M64 51.5h17.4l-1.6 18.5-15.8 4.3v13.8l31-8.6 4-44.6H64v16.6zm0-27h33.4l-1.2 13.4H64V24.5z"/>
    </svg>
  )
}

export function JavaScriptLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="JavaScript logo">
      <rect width="128" height="128" rx="26" fill="#F7DF1E"/>
      <path fill="#000000" d="M72.3 87.2c2.4 3.9 5.6 6.8 11.2 6.8 4.7 0 7.7-2.3 7.7-5.5 0-3.8-3.1-5.2-8.3-7.5l-2.8-1.2c-8.2-3.5-13.7-7.9-13.7-17.4 0-8.6 6.6-15.2 17-15.2 7.4 0 12.6 2.6 16.3 9.1l-7.7 4.9c-1.7-2.9-3.7-4.2-8.6-4.2-3.9 0-6.4 2.5-6.4 5.2 0 3.2 2.1 4.5 7.1 6.7l2.8 1.2c9.7 4.2 15.1 8.5 15.1 18.1 0 10.4-8.2 16.2-18.7 16.2-10.5 0-17.1-5.1-20.2-12.3l8.6-4.9zM36.1 87.8c1.8 3.1 3.5 5.7 7.5 5.7 3.9 0 6.3-1.6 6.3-7.7V48h10.4v37.6c0 11.8-6.9 17.1-16.7 17.1-8.5 0-13.5-4.4-16.1-10.7l8.6-4.2z"/>
    </svg>
  )
}

export function PhpLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="PHP logo">
      <ellipse cx="64" cy="64" rx="60" ry="36" fill="#777BB4"/>
      <ellipse cx="64" cy="64" rx="55" ry="31" fill="#4F5B93"/>
      <ellipse cx="64" cy="64" rx="52" ry="28" fill="#777BB4"/>
      <path fill="#FFFFFF" d="M38.8 51.5h-9.7l-4.7 25h7l2-10.5h5.4c6.2 0 9.8-3 10.9-8.7 1.1-5.9-1.9-8.8-8-8.8zm-1.8 9.5h-4.3l1.8-9.5h4.3c2.7 0 4.1 1.1 3.5 4.3-.5 3.3-2.6 5.2-5.3 5.2zm32.8-9.5h-7l-1.8 9.5h-5.4l1.8-9.5h-7l-4.7 25h7l2-10.5h5.4l-2 10.5h7l4.7-25zm29.8 0H89.9l-4.7 25h7l2-10.5h5.4c6.2 0 9.8-3 10.9-8.7 1.1-5.9-1.9-8.8-8-8.8zm-1.8 9.5h-4.3l1.8-9.5h4.3c2.7 0 4.1 1.1 3.5 4.3-.5 3.3-2.6 5.2-5.3 5.2z"/>
    </svg>
  )
}

export function DartFlutterLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Flutter and Dart logo">
      <defs>
        <linearGradient id="df-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#54C5F8" />
          <stop offset="100%" stopColor="#29B6F6" />
        </linearGradient>
        <linearGradient id="df-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0175C2" />
          <stop offset="100%" stopColor="#02569B" />
        </linearGradient>
      </defs>
      <g transform="translate(14, 4) scale(0.61)">
        <path fill="url(#df-grad1)" d="M100.2 0L0 100.2l30.8 30.8L161.8 0H100.2z" />
        <path fill="url(#df-grad1)" d="M100.2 99.4L39.8 159.8l30.8 30.8 91.2-91.2H100.2z" />
        <path fill="#0D47A1" d="M70.6 190.6l28.6 11.4h62.6l-60.4-60.4-30.8 49z" />
        <path fill="url(#df-grad2)" d="M101.4 141.6L70.6 110.8l30.8-30.8 60.4 60.4-30.6 30.8z" />
      </g>
    </svg>
  )
}
export const FlutterLogo = DartFlutterLogo;
export const MobileDevLogo = DartFlutterLogo;

export function WebDevLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return <HtmlCssLogo className={className} />
}
export const ProgrammerLogo = WebDevLogo;

export function WordPressLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="WordPress logo">
      <circle cx="12" cy="12" r="11.5" fill="#21759B" />
      <path
        fill="#FFFFFF"
        d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"
      />
    </svg>
  )
}

export function SkillLogo({
  name,
  fallbackEmoji,
  className = 'w-10 h-10',
}: {
  name: string
  fallbackEmoji?: string
  className?: string
}) {
  const normalized = name.toLowerCase().trim()

  if (normalized.includes('figma')) {
    return <FigmaLogo className={className} />
  }

  if (normalized.includes('illustrator')) {
    return <IllustratorLogo className={className} />
  }

  if (normalized.includes('corel')) {
    return <CorelDrawLogo className={className} />
  }

  if (normalized.includes('canva')) {
    return <CanvaLogo className={className} />
  }

  if (normalized.includes('html') || normalized.includes('css')) {
    return <HtmlCssLogo className={className} />
  }

  if (normalized.includes('javascript') || normalized.includes('typescript') || normalized.includes('js')) {
    return <JavaScriptLogo className={className} />
  }

  if (normalized.includes('php') || normalized.includes('mysql')) {
    return <PhpLogo className={className} />
  }

  if (normalized.includes('flutter') || normalized.includes('dart') || normalized.includes('mobile')) {
    return <DartFlutterLogo className={className} />
  }

  if (normalized.includes('wordpress')) {
    return <WordPressLogo className={className} />
  }

  if (
    normalized.includes('web') ||
    normalized.includes('programmer') ||
    normalized.includes('code') ||
    normalized.includes('developer') ||
    normalized.includes('software')
  ) {
    return <WebDevLogo className={className} />
  }

  return <FontAwesomeIcon icon={faCode} className={className} />
}
