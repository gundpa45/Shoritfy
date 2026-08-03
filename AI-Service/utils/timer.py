import time

from utils.logger import section, info


class PipelineTimer:

    def __init__(self):
        self._starts = {}
        self._results = {}

    def start(self, stage: str):
        """
        Start timing a stage.
        """
        self._starts[stage] = time.perf_counter()

    def stop(self, stage: str):
        """
        Stop timing a stage.
        """
        if stage not in self._starts:
            return

        elapsed = time.perf_counter() - self._starts[stage]

        self._results[stage] = elapsed

        return elapsed

    def report(self):
        """
        Print pipeline performance report.
        """

        section("📊 PIPELINE PERFORMANCE REPORT")

        total = 0

        for stage, value in self._results.items():

            info(f"{stage:<20} : {value:.2f} sec")

            total += value

        print("-" * 70)

        info(f"{'TOTAL':<20} : {total:.2f} sec")