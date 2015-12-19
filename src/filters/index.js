export function fromNow (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function formatDate(value, separator) {
  if (typeof value != "number") return value

  separator = (separator) ? separator : " "
  const d = new Date(value)
  return d.toLocaleDateString() + separator + d.toLocaleTimeString()
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}
