import { styled } from 'solid-styled-components'

export const Spinner = styled.div<{
  radius?: string
  stroke?: string
}>`
  height: ${(p) => p.radius || '80px'};
  box-sizing: border-box;
  border: ${(p) => p.stroke || '10px'} solid #333;
  border-color: ${(p) => p.color || p.theme?.colors.text.string()};
  animation: rsm-sweep 1s linear alternate infinite, rsm-rotate 0.8s linear infinite;
  aspect-ratio: 1/1;
  border-radius: 50%;

  @keyframes rsm-rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rsm-rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rsm-sweep {
    0% {
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
    }

    50% {
      clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
    }

    100% {
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
    }
  }
  @keyframes rsm-sweep {
    0% {
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
    }

    50% {
      clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
    }

    100% {
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
    }
  }
`
