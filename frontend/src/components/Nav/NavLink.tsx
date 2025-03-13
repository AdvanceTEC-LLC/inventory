import { Link } from 'react-router-dom'
import { LinkType } from '../../types/link'

interface NavLinkProps {
  link: LinkType
}

const toKebabCase = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const NavLink = ({ link }: NavLinkProps) => {
  return (
    <div className="relative group">
      {/* Parent Navigation Tab */}
      <Link to={`/${link.path}`}>
        <div className="w-full h-full py-2 px-8 md:px-2 hover:bg-white hover:text-atec transition duration-200">
          {link.name}
        </div>
      </Link>

      {/* Dropdown Items */}
      <div className="md:absolute z-10 left-0 w-full min-w-fit hidden bg-white shadow-lg group-hover:block">
        {link.dropdown?.map((dropdownLink) => (
          <Link
            key={dropdownLink.name}
            to={`/${toKebabCase(link.path)}/${toKebabCase(dropdownLink.path)}`}
            className="block px-8 py-2 md:px-2 text-gray-800 whitespace-nowrap hover:bg-atec-dark hover:text-white transition"
          >
            {dropdownLink.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavLink
