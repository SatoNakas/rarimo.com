import LogoIcon from '@/assets/icons/logo-icon.svg'

export default function Footer() {
  return (
    <footer className='flex flex-col items-center gap-5 pb-16 pt-8 text-center'>
      <span className='text-[#282828]'>
        <LogoIcon />
      </span>
      <p className='text-[14px] text-[#282828]/50'>
        Verify anyone. Store nothing.
      </p>
    </footer>
  )
}
