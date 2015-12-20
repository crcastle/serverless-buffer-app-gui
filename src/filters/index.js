export function fromNow (time) {
  let between = Date.now() / 1000 - Number(time)/1000
  const suffix = (between > 0) ? ' ago' : ' from now'
  between = Math.abs(between)

  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute') + suffix
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour') + suffix
  } else {
    return pluralize(~~(between / 86400), ' day') + suffix
  }
}

export function formatDate(value, separator) {
  if (typeof value != "number") return value

  return fromNow(new Date(value))
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}
