import time
from contextlib import contextmanager


class PipelineTimer:

    def __init__(self):
        self.timers = {}

    def start(self, name: str):
        self.timers[name] = time.perf_counter()

    def stop(self, name: str):

        if name not in self.timers:
            return

        elapsed = time.perf_counter() - self.timers[name]

        print(f"⏱ {name:<20}: {elapsed:.2f} sec")

        del self.timers[name]

    @contextmanager
    def track(self, name: str):
        self.start(name)

        try:
            yield

        finally:
            self.stop(name)