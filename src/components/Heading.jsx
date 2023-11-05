import PropTypes from 'prop-types';

const Heading = ({title, subtitle}) => {
    return (
        <>
            {subtitle && <h4 className="font-semibold uppercase tracking-widest text-sm text-slate-700 mb-1">{subtitle}</h4>}
            <h2 className="text-2xl font-semibold mb-5">{title}</h2>
        </>
    )
}

Heading.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
}

export default Heading