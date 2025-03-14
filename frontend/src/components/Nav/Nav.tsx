import { useState } from 'react'
import { routes } from './routes'
import NavLink from './NavLink'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const sortedLinks = routes
    .map((parentLink) => ({
      ...parentLink,
      // Sort the dropdown items if they exist
      dropdown: parentLink.dropdown?.sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }))
    // Sort the parent links by their name
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-atec-light to-atec md:px-24 lg:px-48">
      <div className="w-full flex justify-between items-center p-4 px-8 md:py-4 md:px-0">
        {/* Logo */}
        <img
          className="h-12 max-w-full object-contain"
          src="/images/ATEC-logo-white.png"
          alt="AdvanceTEC"
        />

        {/* Hamburger Menu Icon (visible on small screens) */}
        <button
          className="flex items-center text-center block md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <i className="material-icons text-white text-4xl">menu</i>
        </button>
      </div>
      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col pb-2 md:pb-0 md:flex-row md:gap-x-8 md:items-center text-white`}
      >
        {sortedLinks.map((link, index) => (
          <NavLink key={index} link={link} />
        ))}
      </div>
    </div>
  )
}

export default Nav
