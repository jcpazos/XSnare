import numpy as np
import pdb
import matplotlib.pyplot as plt
from scipy import stats
from scipy.interpolate import interp1d
import matplotlib.ticker as ticker

times = [4.773, 4.813, 5.45367, 1.38567, 1.52567, 10.8758, 6.78933, 3.88517, 4.2065, 3.45217, 2.40617, 2.75133, 25.8337, 3.69183, 2.7855, 2.368, 1.66933, 3.20917, 12.3857, 2.5585, 1.29067, 5.55033, 18.3853, 4.48717, 1.67217, 8.03583, 2.77383, 4.22333, 7.53717, 1.952, 3.167, 8.83883, 6.92483, 5.55367, 2.93483, 1.7355, 4.24267, 1.54017, 4.4565, 7.2505, 2.17283, 3.08667, 4.04283, 4.34133, 2.07217, 3.91867, 3.9415, 2.743, 3.18683, 1.85283, 3.35483, 5.96867, 2.55183, 4.7235, 7.19233]

n = len(times)
X = np.array(times) # assume data is sorted

counter_x2 = 0
for p in times:
	if (p < 5):
		counter_x2+= 1

less_x2 = (counter_x2/float(n))*100.0
print(less_x2)

plt.figure()
plt.hist(times,bins=15,ec='black')
plt.xlabel('Time taken (minutes)')
plt.ylabel('Signatures')
plt.show()


